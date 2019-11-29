import React, {Component} from 'react'

import './Loading.less'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className="loading-wrap" style={{display:this.props.show?'block':'none'}}>
                <div className="loading-container animation-2">
                    <div className="shape shape1"/>
                    <div className="shape shape2"/>
                    <div className="shape shape3"/>
                    <div className="shape shape4"/>
                    <div className="shape shape5"/>
                </div>
            </div>
        )
    }
}

export default App