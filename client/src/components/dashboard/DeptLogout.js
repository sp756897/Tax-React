import React, { Component } from "react";

class DeptLogout extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.func()
    }

    render() {
        return (
            <div>
                <h1>Bye</h1>
            </div>
        )
    }
}

export default DeptLogout;