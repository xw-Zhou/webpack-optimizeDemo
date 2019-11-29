import "@babel/polyfill"
import 'es6-proxy-polyfill'//用来兼容mobx
import React from 'react';
import ReactDOM from 'react-dom';
import Routers from './router/router'
import { HashRouter as Router, } from 'react-router-dom'
import {Provider} from 'mobx-react'


import './styles/common/common.less'


if (module.hot) {
    module.hot.accept()
}

ReactDOM.render(
    <Provider>
        <Router>
            <Routers/>
        </Router>
    </Provider>
    ,document.getElementById('root'));