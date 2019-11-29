import axios from 'axios'
import qs from 'qs'
import Store from 'store/store'
import {message} from 'antd'
import Utils from './utils'


message.config({
    top: '50%',//提示框据顶部距离
    duration: 2,//提示框持续时间 s
});
let CancelToken=axios.CancelToken;
let cancel=null;


class Ajax {
    request(param) {
        axios.defaults.headers.common={
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            // 'Accept-Encoding': 'gzip, deflate'
        }
        const ajaxParam={
            url: param.url || '',//请求地址
            method: param.method || 'post',//请求方法
            data: qs.stringify({json: JSON.stringify(param.data)}) || '',//发送的数据
            timeout: param.timeout || 30000,//设置请求超时
            responseType:param.responseType || 'json',//响应的数据格式
            headers: param.headers || {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},//请求头
            loadingNeed: param.loadingNeed===undefined ? true : param.loadingNeed,//是否有动画
            loadingTimes: param.loadingTimes || 300,//设置loading动画持续时间，动画持续时间为请求时间加上设置的时间
            isHint : param.isHint || false,//是否显示提示框
            successHintVal:param.successHintVal || 'Success', //提示框内容
        }
        return new Promise((resolve, reject) => {
            let requestInterceptor = axios.interceptors.request.use((config)=>{//请求拦截器
                // 在发送请求之前做些什么
                // console.log(config);
                ajaxParam.loadingNeed ? Store.loadingStore.ajaxStart() : ''; //开始loading动画

                axios.interceptors.request.eject(requestInterceptor);//清除请求拦截器
                return config;
            },function (err) {
                // 对请求错误做些什么
                return reject(err);
            });
            let responseInterceptor = axios.interceptors.response.use(function (response) {//响应拦截器
                // 对响应数据做点什么
                // console.log(response)

                axios.interceptors.response.eject(responseInterceptor);//清除响应拦截器
                return response;
            }, function (err) {
                // 对响应错误做点什么
                return reject(err);
            });

            axios.request({
                url: ajaxParam.url,
                method: ajaxParam.method,
                data: ajaxParam.data,
                timeout: ajaxParam.timeout,
                responseType:ajaxParam.responseType,
                headers: ajaxParam.headers,
                cancelToken: new CancelToken(c => { //强行中断请求要用到的
                    cancel = c;
                }),
                // transformRequest:[function (data) {//在请求之前对数据进行处理
                //     console.log(data)
                //     return data;
                // }],
                // onUploadProgress: function (progressEvent) {// `onUploadProgress` 允许为上传处理进度事件
                //     // 对原生进度事件的处理
                // },
                // onDownloadProgress: function (progressEvent) {// `onDownloadProgress` 允许为下载处理进度事件
                //     // 对原生进度事件的处理
                // },
            }).then((res) => {
                Store.loadingStore.ajaxEnd(ajaxParam.loadingTimes);//停止loading动画

                let data=this.changeData(res.data);//去除FormId
                cancel=null;//请求成功将中断axios方法置空

                ajaxParam.isHint ? message.success(ajaxParam.successHintVal) : '';

                resolve({data:data,res:res})
            }).catch((err) => {
                message.error('Error');
                reject();

                throw new Error(err);
            })
        })
    }

    ajax(param){
        this.request(param.data).then(param.success).catch(param.error)
    }

    changeData(res){//去除掉返回数据的formID
        for(let i in res){
            if(res.hasOwnProperty(i)){
                return res[i];
            }
        }
    }

    //第一个参数是formId，第二个是数据，但三个是请求还是提交，请求0，提交1
    userFormData(formId,data={"0000":{}},method=0){
        if(!formId){throw new Error('没有传递formId！');}

        let obj={};
        obj[formId]={};

        obj[formId]["method"]=method;
        obj[formId]["data"]=data;

        console.log(JSON.stringify(obj));
        return obj;
    }

    cancelAjax(str=""){//中断axios请求
        if(cancel){
            cancel(str)
        }
    }
}

const Axios=new Ajax();

export default Axios;