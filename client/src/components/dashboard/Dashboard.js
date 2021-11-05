import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Dashnav from "./DashNav";

class Dashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            accounts: this.props.accounts,
            contract: this.props.contract,
            response: this.props.location.state
        }
    }

    onLogoutClick = e => {
        e.preventDefault();
    };

    render() {
        const { response } = this.state;
        return (
            <div class="row">
                <Dashnav />
                <div class="col s12 m8 l9" style={{ marginTop: "9rem" }}>
                    <div className="col s12 center-align">
                        <h4>
                            <b>Hey there,</b> {response.name} What's Up?<br></br>
                            <h1 className="flow-text grey-text text-darken-1">
                                You are logged into{" "}
                                <span style={{ fontFamily: "monospace" }}>Vircom</span> Ideas app 👏
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
                            Create An Idea
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Dashboard);