import React, { Component } from "react";
import { Link } from "react-router-dom";

class DeptDashnav extends Component {

    constructor(props) {
        super(props);

    }

    onLogoutClick = (e) => {
        e.preventDefault();
    };

    render() {
        return (
            <div class="col s12 m4 l3">
                <Link
                    to="/deptdashboard"
                    style={{
                        width: "140px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        width: "100%",
                        margin: "6px 6px"
                    }}
                    className="btn btn-large waves-effect waves-light hoverable #2196f3 blue"
                >
                    DeptDashboard
                </Link>
                <Link
                    to="/createproject"
                    style={{
                        width: "140px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        width: "100%",
                        margin: "6px 6px"
                    }}
                    className="btn btn-large waves-effect waves-light hoverable #2196f3 blue"
                >
                    Create Project
                </Link>
                <Link
                    to="/projects"
                    style={{
                        width: "140px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        width: "100%",
                        margin: "6px 6px"
                    }}
                    className="btn btn-large waves-effect waves-light hoverable #2196f3 blue"
                >
                    Projects
                </Link>
                <Link
                    to="/requestslist"
                    style={{
                        width: "140px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        width: "100%",
                        margin: "6px 6px"
                    }}
                    className="btn btn-large waves-effect waves-light hoverable #2196f3 blue"
                >
                    Requests
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

export default DeptDashnav;