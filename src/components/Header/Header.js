import React, {Component} from 'react'
import Skin from 'components/Skin/Skin'

import './Header.less'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount(){

    }
    render() {
        return (
            <div className="header primary-bg">
                <Skin/>
            </div>
        )
    }
}

export default Header