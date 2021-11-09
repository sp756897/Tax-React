import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import DeptDashnav from "./DeptDashnav";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Projects extends Component {

    constructor(props) {
        super(props)
        this.state = {
            accounts: this.props.accounts,
            contract: this.props.contract,
            res: this.props.res,
            prolist: []
        }
    }

    async componentDidMount() {
        const { accounts, contract, res } = this.state;

        try {

            var procount = await contract.methods.getProcount(res.id).call();
            console.log(procount)
            var prolist = []
            for (let i = 1; i <= procount; i++) {
                var prodet = await contract.methods.getProject(res.id, i).call();
                console.log("prodet:", prodet)
                const pro = {
                    proname: prodet[0],
                    proreq: prodet[1]
                }
                prolist.push(pro)
            }
            this.setState({
                prolist: prolist
            })
            console.log(prolist)

            toast.success('🦄 Project Created 👍', {
                position: "top-right",
                autoClose: 5000,
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

        const { prolist } = this.state;

        const prosits = prolist.map((pro, key) =>
        (
            <div class="col s21 m20" key={key}>
                <div class="card #76ff03 light-green accent-3">
                    <div class="card-content black-text" style={{ marginBottom: "3rem" }}>
                        <span class="card-title">{pro.proname}</span>
                        <p>{pro.proreq}</p>
                    </div>
                    <div class="card-action">
                        <a href="#" style={{ color: "#76ff03" }}>*******************</a>
                        <a href="#" style={{ color: "#76ff03" }}>*******************</a>
                    </div>
                    <Link
                        to={{
                            pathname: "/request",
                            proid: {
                                proid: (key + 1)
                            }
                        }}
                        style={{
                            width: "140px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            width: "100%",
                            margin: "6px 6px"
                        }}
                        className="btn waves-effect waves-light hoverable black"
                    >
                        Request
                    </Link>
                </div>
            </div>
        ));

        return (
            <div class="row">
                <DeptDashnav />
                <div class="col s12 m8 l9">
                    <div className="container">
                        <div style={{ marginTop: "3rem" }} className="row">
                            <div className="col s8 offset-s3">
                                <div className="col s12" style={{ paddingLeft: "4px", marginLeft: "6rem" }}>
                                    <h4>
                                        <b>Projects</b> Board
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col s12 center-align">
                        {this.state.prolist ? prosits : ""}
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
        );
    }
}


export default withRouter(Projects);