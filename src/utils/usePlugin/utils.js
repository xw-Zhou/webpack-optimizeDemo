
class Utils{
    judgeDOM(dom,parent){//判断某元素是不是另外一个元素的子元素
        while (dom != undefined && dom != null && dom.tagName.toUpperCase() != 'BODY'){
            if (dom == parent){
                return true;
            }
            dom = dom.parentNode;
        }
        return false;
    }
    IsRealUrl(mockUrl='',realUrl='',flag=true){//判断是否真实的接口
        return flag ? mockUrl : realUrl
    }
    Typeof(res){ // 判断数据类型
        return toString.call(res).split(' ')[1].split(']')[0]
    }
    changeTableData(data,res){ //修改数据，往数据里添加需要的键，主要在表格上使用,res是需要添加的键,字符串类型
        let num=0;
        let arr=[];
        let datas=JSON.parse(JSON.stringify(data));

        for(let i in datas){
            num++;
            datas[i][res]=num;
            arr.push(datas[i])
        }
        return arr;
    }
    genSrcIdxKey(idx){
        let decStr='',sixStr='';

        if(parseInt(idx) < 16){
            decStr = '0';
        }
        decStr += idx.toString(16);//toString把一个逻辑值转换为字符串
        if(arguments.length>1){
            if((parseInt(arguments[1])+1) < 16){
                sixStr = '0';
            }
            sixStr += (parseInt(arguments[1])+1).toString(16);
        }else{
            sixStr='00';
        }
        return ((sixStr.concat(decStr)).toString(16));//concat连接2个或多个数组
    }


}

let utils=new Utils();

export default utils;