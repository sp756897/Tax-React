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
            prolist: [],
        }
    }

    async componentDidMount() {
        const { accounts, contract, res } = this.state;

        try {

            var procount = await contract.methods.getProcount(res.id).call();
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
            <div class="">
                <div key={key} class="col s12 m8 l8" style={{ paddingBottom: "2rem" }}>
                    <ul class="collection z-depth-3" style={{ padding: "2rem" }}>
                        <li class="collection-item avatar">
                            <li class="collection-header" style={{ fontWeight: "bold" }}><h6><b>{pro.proname}</b></h6></li>
                            <p>The name of Project is {pro.proname}
                            </p>
                            <div class="valign-wrapper">
                                <div class="secondary-content">
                                    <Link
                                        to={{
                                            pathname: "/request",
                                            proid: {
                                                proid: (key + 1)
                                            }
                                        }}
                                        style={{
                                            width: "150px",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px",
                                            marginTop: "1rem",
                                            float: "right"
                                        }}
                                        className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                                    >
                                        Request
                                    </Link>
                                </div>
                            </div>

                        </li>
                    </ul>

                </div>
            </div>

        ));
        console.log(prosits.length === 0)


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
                    {prosits.length === 0 ? (<div><h4>No Projects Created Yet!</h4></div>) : prosits}
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