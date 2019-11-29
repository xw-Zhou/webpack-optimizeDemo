import React, {Component} from 'react'
import {Icon} from 'antd'
import utils from 'utils/usePlugin/utils'
import {withRouter} from 'react-router-dom'

import './Skin.less'

class Skin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            theme_list:['#405bff','#e57bee','#ff6130','#a9c0ff','#49aa4b','#8ba69c']
        }
        // this.dropDown=React.createRef();
    }
    componentDidMount(){
        //页面打开保存上次设置的主题思路：将设置的颜色对象值传给后端，在compoentDidMount页面加载的时候去请求后端，然后在请求成功的then里执行
    }

    handleDropDown=(e)=>{//点击显示下拉菜单
        e.persist();
        let dropDown=this.dropDown;
        dropDown.style.cssText="opacity:1;top:0px;height:auto;min-height:120px;";
        document.body.addEventListener('click',this.judge)
    }

    judge=(e)=>{
        e=e||window.event;
        let target=e.target||e.srcElement;
        let dropDown=this.dropDown;
        if(dropDown.style.opacity===0){return;}
        let flag=utils.judgeDOM(target,this.dropDown);
        if(!flag && dropDown){
            dropDown.style.cssText="opacity:0;top:-10px;height:0";
        }
        document.body.removeEventListener('click',this.judge);
    }

    themeList=(e)=>{//点击更换皮肤
        e=e||window.event;
        let target=e.target;
        let color;
        if(target.tagName.toLowerCase()==='li'){
            color=target.getAttribute('data-theme');
            window.less.modifyVars(
                {
                    '@primary-color': color,
                    // '@btn-primary-bg': '#cc753f',
                }
            )
            .then(() => {console.log('success')})
            .catch(error => {
                console.log(error);
            });
        }
        // ref={(e)=>this.dropDown=e}
    }
    handleLoginOut=()=>{
        this.props.history.push('/login')
    }
    render() {
        return (
            <div className={'skin-wrap'}>
                <div className={'skin-root'} onClick={this.handleDropDown}>
                    <Icon type={'user'}/>
                    <span>Root User</span>
                </div>
                <ul className={'skin-dropDown'} ref={(e)=>this.dropDown=e}>
                    <li>
                        <ul className={'change-theme'} onClick={this.themeList}>
                            {
                                this.state.theme_list.map((item,ind)=>{
                                    return (
                                        <li key={ind} data-theme={item} style={{background:`${item}`}}/>
                                    )
                                })
                            }
                        </ul>
                    </li>
                    <li className={'sign-out'}>
                        <span onClick={this.handleLoginOut}>Sign out</span>
                    </li>
                </ul>
            </div>
        )
    }
}

export default withRouter(Skin)