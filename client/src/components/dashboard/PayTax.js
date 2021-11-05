import React, { Component } from "react";
import Dashnav from "./DashNav";

class PayTax extends Component {
    constructor(props) {
        super(props)
        this.state = {
            accounts: this.props.accounts,
            contract: this.props.contract,
            res: this.props.res
        }
    }

    componentDidMount() {

    }

    onSubmit = async (e) => {
        e.preventDefault();
        const { accounts, contract, res } = this.state;

        await contract.methods.payTax().send({ from: accounts[0], value: 100000000000000 });

        const resp = await contract.methods.getPayer(accounts[0]).call();

        this.setState({ res: resp });

    }

    render() {
        const { res } = this.state;
        return (
            <div class="row">
                <Dashnav />
                <div class="col s12 m8 l9" style={{ marginTop: "1rem" }}>
                    <div className="col s12 center-align">
                        <div>
                            <h4>
                                Transportation Tax
                            </h4>
                            <div class="card-panel #eceff1 blue-grey lighten-5 z-depth-1" style={{ borderWidth: "1px", borderColor: "black", borderBlockStyle: "double" }}>
                                <div class="row valign-wrapper">
                                    <div class="col s2">
                                        <i className="material-icons">directions_car</i>
                                    </div>
                                    <div class="col s10">
                                        <span class="black-text">
                                            Salary : {res.salary} Tax : {res.tax}
                                        </span>
                                    </div>
                                    <button
                                        style={{
                                            width: "150px",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px",
                                            marginTop: "1rem"
                                        }}
                                        onClick={this.onSubmit}
                                        className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                                    >
                                        Pay
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

export default PayTax;