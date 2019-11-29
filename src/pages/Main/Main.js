import React, {Component} from 'react'
import {Col,Row} from 'antd'
import Aside from 'components/Aside/Aside'
import Header from 'components/Header/Header'

//less
import './Main.less'

class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading_show:true
        }
    }

    render() {
        return (
            <div>
                <Header/>
                <Row>
                    <Col xs={24} sm={24} md={6} lg={4} xl={4} xxl={4}>
                        <Aside/>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={20} xl={20} xxl={20}>
                        <div className="contentWrap">
                            <div className={'content'}>
                                {this.props.children}
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Main