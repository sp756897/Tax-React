import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import DeptDashnav from "./DeptDashnav";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom'

class Request extends Component {
    constructor(props) {
        super(props)
        this.state = {
            web3: this.props.web3,
            request: null,
            title: "",
            desc: "",
            errors: {},
            accounts: this.props.accounts,
            contract: this.props.contract,
            res: this.props.res,
            proid: this.props.location.proid.proid
        }
    }

    async componentDidMount() {
        //this.getProid()
        console.log("proid:", this.state.proid)

    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = async (e) => {
        e.preventDefault();
        const { accounts, contract, res, web3 } = this.state;

        console.log(this.state.request)


        let strtax = this.state.request.toString()

        const weiTax = web3.utils.toWei(strtax, "ether")

        if (this.state.request === null) {
            toast.error('Please fill Amount !', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        try {
            var resop = await contract.methods.requestFund(res.id, this.state.proid, weiTax, this.state.title, this.state.desc).send({ from: accounts[0] });
            console.log(resop)
            toast.success('🦄 Request Created 👍', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        catch (err) {
            toast.error('🦄 Try Agian!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            console.log(err)
        }
    }

    render() {
        const { errors } = this.state;

        return (
            <div class="row">
                <DeptDashnav />
                <div class="col s12 m8 l9" style={{ marginTop: "9rem" }}>
                    <div className="col s12 center-align">

                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Create</b> Request
                            </h4>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.title}
                                    error={errors.title}
                                    id="title"
                                    type="text"
                                />
                                <label htmlFor="title">Title</label>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.desc}
                                    error={errors.request}
                                    id="desc"
                                    type="text"
                                />
                                <label htmlFor="desc">Description</label>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.request}
                                    error={errors.request}
                                    id="request"
                                    type="number"
                                />
                                <label htmlFor="request">Amount</label>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                    Request
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                {/* Same as */}
                <ToastContainer />
            </div>
        )
    }
}

export default withRouter(Request);