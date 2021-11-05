import React, { Component } from "react";
import { Link } from "react-router-dom";

class Dashnav extends Component {

    onLogoutClick = e => {
        e.preventDefault();
    };

    render() {
        return (
            <div class="col s12 m4 l3">
                <Link
                    to="/dashboard"
                    style={{
                        width: "140px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        width: "100%",
                        margin: "6px 6px"
                    }}
                    className="btn btn-large waves-effect waves-light hoverable #2196f3 blue"
                >
                    Dashboard
                </Link>
                <Link
                    to="/paytax"
                    style={{
                        width: "140px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        width: "100%",
                        margin: "6px 6px"
                    }}
                    className="btn btn-large waves-effect waves-light hoverable #2196f3 blue"
                >
                    Pay Tax
                </Link>
                <button
                    style={{
                        width: "140px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        width: "100%",
                        margin: "6px 6px"
                    }}
                    onClick={this.onLogoutClick}
                    className="btn btn-large waves-effect waves-light hoverable #2196f3 blue"
                >
                    Logout
                </button>
            </div>
        );
    }
}

export default Dashnav;