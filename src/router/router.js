import React, { Component } from 'react';
import { Router,Route,Switch,Redirect } from 'react-router-dom'
import App from '../App'
import Main from '../pages/Main/Main'
import {A,B} from './router_lazyload'


class Routers extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount(){

    }
    render() {
        return (
            <App>
                <Switch>
                    <Route path="/" render={()=>
                        <Main>
                            <Switch>
                                <Route path="/a" component={A}/>
                                <Route path="/b" component={B}/>
                                <Redirect from="/" to="/a"/>
                            </Switch>
                        </Main>
                    }/>
                </Switch>
            </App>
        );
    }
}

export default Routers;