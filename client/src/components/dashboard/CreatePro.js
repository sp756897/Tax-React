import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import DeptDashnav from "./DeptDashnav";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CreatePro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            salary: "",
            errors: {},
            accounts: this.props.accounts,
            contract: this.props.contract,
            res: this.props.res,
            dept: null
        }
    }

    async componentDidMount() {
        var dept = await this.state.contract.methods.getHead(this.state.accounts[0]).call();
        const depthead = {
            id: dept[0],
            deptname: dept[1]
        }
        this.setState({
            dept: depthead
        });
        console.log(this.state.dept)
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = async (e) => {
        e.preventDefault();
        const { accounts, contract, res } = this.state;

        if (this.state.name === "") {
            toast.error('Please fill Project Name!', {
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
            var resop = await contract.methods.createProject(this.state.name, this.state.dept.id).send({ from: accounts[0] });
            console.log(resop)
            toast.success('🦄 Project Created 👍', {
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
                autoClose: 5000,
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
                <div class="">
                    <div class="col s12 m8 l9 center-align" style={{ marginTop: "9rem", paddingRight: "6rem", paddingLeft: "6rem" }}>
                        <div className="col s12">

                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <h4>
                                    <b>Create</b> Project
                                </h4>
                            </div>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="input-field col s12">
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.name}
                                        error={errors.name}
                                        id="name"
                                        type="text"
                                    />
                                    <label htmlFor="name">Project Name</label>
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
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <ToastContainer
                        position="top-right"
                        autoClose={2000}
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
            </div>
        )
    }
}

export default withRouter(CreatePro);