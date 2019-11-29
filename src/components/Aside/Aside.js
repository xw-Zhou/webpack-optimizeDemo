import React, {Component} from 'react'
import {Menu,Icon} from 'antd'
import {NavLink,withRouter} from 'react-router-dom'

import './Aside.less'

const SubMenu = Menu.SubMenu;

const MenuConfig=[
    {
        title:'AAA',
        key:'/a'
    },
    {
        title:'BBB',
        key:'/b',
    },
]

class Aside extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuNode:''
        }
    }
    componentWillMount(){
        let menuNode=this.renderMenu(MenuConfig);
        this.setState({
            menuNode
        })
    }
    componentDidMount(){
        this.windowScroll()
    }
    renderMenu=(data)=>{//渲染菜单栏
        return data.map((item,ind)=>{
            if(item.children){//如果有子元素的话递归渲染
                return (
                    <SubMenu title={this.childrenNum(item)} key={item.key} onTitleClick={this.handleOpen}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item key={item.key}>
                    <NavLink to={item.key}>
                        <Icon type="bar-chart" />
                        {item.title}
                    </NavLink>
                </Menu.Item>
            )
        })
    }
    childrenNum=(Item)=>{//渲染下拉菜单的子节点个数
        let title=Item.title;
        let childLen=Item.children.length;
        return (
            <span>
                <Icon type="bar-chart" />
                <span>{title}</span>
                <span className={'spans'}>{childLen}</span>
            </span>
        )
    }
    handleOpen=(e)=>{//点击下拉菜单的子节点时触发
        // e.domEvent.persist();
        // console.log(e.domEvent)
    }
    windowScroll=()=>{//设置aside的样式
        let asideDOM=this.asideDOM;
        let headerHeight=parseInt(getComputedStyle(document.getElementsByClassName('header')[0])['height']);

        window.addEventListener('scroll',function () {
            let contentTop=document.documentElement.scrollTop||document.body.scrollTop;
            let Top=headerHeight-contentTop < 0 ? 0 : headerHeight-contentTop;
            let screenWith=document.documentElement.offsetWidth || document.body.offsetWidth;
            // console.log(screenWith)
            if(screenWith<768){
                asideDOM.style="";
            }else if(screenWith>=768){
                asideDOM.style.cssText=`top:${Top+'px'}`;
            }
        })
    }
    render() {
        return (
            <div className="aside asideFixed" ref={(e)=>{this.asideDOM=e}}>
                <Menu mode="inline" selectedKeys={[this.props.location.pathname]}>
                    {this.state.menuNode}
                </Menu>
            </div>
        )
    }
}

export default withRouter(Aside)