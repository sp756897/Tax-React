import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Dashnav from "./DashNav";

class Dashboard extends Component {

    constructor(props) {
        super(props)
        console.log(JSON.parse(localStorage.getItem("userData")))
        this.state = {
            accounts: this.props.accounts,
            contract: this.props.contract,
            response: JSON.parse(localStorage.getItem("userData")),
            web3: this.props.web3

        }
    }

    onLogoutClick = e => {
        e.preventDefault();
        localStorage.removeItem("userData")
        this.props.func()
    };

    render() {
        const { response, web3 } = this.state;
        return (
            <div class="row">
                <Dashnav />
                <div class="col s12 m8 l9" style={{ marginTop: "1rem" }}>
                    <div className="col s12 center-align">
                        <h4>
                            <b>Hey there,</b> {response[1]}<br></br>
                            <h1 className="flow-text grey-text text-darken-1">
                                You are logged into{" "}
                                <span style={{ fontFamily: "monospace" }}>Taxonomy</span> app 👏
                            </h1>
                        </h4>
                    </div>
                    <div class="row">
                        <div class="col s12 m6">
                            <div id="cardsit" class="card grey z-depth-4" style={{ padding: "1rem" }} >
                                <div class="card-content white-text">
                                    <span class="card-title"><b>Salary</b> </span>
                                    <p>Salary of the Payer is {response[4]}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12 m6">
                            <div class="card blue z-depth-4" style={{ padding: "1rem" }} >
                                <div class="card-content white-text">
                                    <span class="card-title"><b>Eth Address</b> </span>
                                    <p style={{
                                        display: "inline-block",
                                        overflow: "hidden",
                                        maxWidth: "40ch",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap"


                                    }}>Ethereum Address {response[5]}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12 m6">
                            <div class="card blue z-depth-4" style={{ padding: "1rem" }} >
                                <div class="card-content white-text">
                                    <span class="card-title"><b>Income Tax</b> </span>
                                    <p>Income Tax paid {web3.utils.fromWei(response[2], "ether")}</p>
                                </div>
                            </div>
                        </div>
                        <div class="col s12 m6">
                            <div class="card blue z-depth-4" style={{ padding: "1rem" }} >
                                <div class="card-content white-text">
                                    <span class="card-title"><b>Transportation Tax</b> </span>
                                    <p>Transportation Tax paid {web3.utils.fromWei(response[3], "ether")}</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        );
    }
}

export default withRouter(Dashboard);