import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import DeptDashnav from "./DeptDashnav";

class DeptDashboard extends Component {

    constructor(props) {
        super(props)
        console.log(JSON.parse(localStorage.getItem("deptData")))
        this.state = {
            accounts: this.props.accounts,
            contract: this.props.contract,
            response: JSON.parse(localStorage.getItem("deptData"))
        }
    }

    componentDidMount() {
        console.log(JSON.parse(localStorage.getItem("deptData")))
    }

    onLogoutClick = e => {
        e.preventDefault();
        localStorage.removeItem("deptdata")
        this.props.deptfunc()
    };

    render() {
        const { response } = this.state;
        return (
            <div class="row">
                <DeptDashnav />
                <div class="col s12 m8 l9" style={{ marginTop: "9rem" }}>
                    <div className="col s12 center-align">
                        <h4>
                            <b>Hey there,</b> {response.deptname} What's Up?<br></br>
                            <h1 className="flow-text grey-text text-darken-1">
                                You are logged into{" "}
                                <span style={{ fontFamily: "monospace" }}>Taxonomy</span> Ideas app 👏
                            </h1>
                        </h4>
                        <button
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            onClick={this.onLogoutClick}
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                            Logout
                        </button>
                        <Link
                            to="/idea"
                            style={{
                                width: "140px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px"
                            }}
                            className="btn btn-large btn-flat waves-effect white black-text"
                        >
                            Create An Project
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(DeptDashboard);