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
            response: this.props.res,
            proco: 0
        }
    }

    async componentDidMount() {
        const { contract, proco } = this.state
        console.log(JSON.parse(localStorage.getItem("deptData")))
        await contract.methods.getProcount(this.state.response.id).call()
            .then((res) => {
                console.log(res)
                this.setState({
                    proco: res
                })
            })

        console.log(proco)
    }

    onLogoutClick = e => {
        e.preventDefault();
        localStorage.removeItem("deptdata")
        this.props.deptfunc()
    };

    render() {
        const { response, proco } = this.state;
        console.log(proco)
        return (
            <div class="row">
                <DeptDashnav />
                <div class="col s12 m8 l9" style={{ marginTop: "1rem" }}>
                    <div className="col s12 center-align">
                        <h4>
                            <b>Department </b> {response.deptname}<br></br>
                            <h1 className="flow-text grey-text text-darken-1">
                                Welcome to{" "}
                                <span style={{ fontFamily: "monospace" }}>{response.deptname}</span> Department
                            </h1>
                        </h4>
                    </div>
                    <div class="row">
                        <div class="col s12 m6">
                            <div id="cardsit" class="card grey z-depth-4" style={{ padding: "1rem" }} >
                                <div class="card-content white-text">
                                    <span class="card-title"><b>Department</b> </span>
                                    <p>Department name is {response.deptname}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12 m6">
                            <div id="cardsit" class="card grey z-depth-4" style={{ padding: "1rem" }} >
                                <div class="card-content white-text">
                                    <span class="card-title"><b>Eth Address</b> </span>
                                    <p style={{
                                        display: "inline-block",
                                        overflow: "hidden",
                                        maxWidth: "30ch",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap"
                                    }}>Head Ethereum Address is {response.mgraddr}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12 m6">
                            <div id="cardsit" class="card grey z-depth-4" style={{ padding: "1rem" }} >
                                <div class="card-content white-text">
                                    <span class="card-title"><b>Projects</b> </span>
                                    <p>Number of Projects Created {proco}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(DeptDashboard);