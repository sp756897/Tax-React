import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import DeptDashnav from "./DeptDashnav";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class RequestsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            accounts: this.props.accounts,
            contract: this.props.contract,
            res: this.props.res,
            reqlist: []
        }
    }

    async componentDidMount() {
        const { contract, res } = this.state;

        try {

            var procount = await contract.methods.getProcount(res.id).call();
            console.log(procount)
            var reqlist = []
            for (let i = 1; i <= procount; i++) {
                var prodet = await contract.methods.getProject(res.id, i).call();
                const pro = {
                    proname: prodet[0],
                    proreq: prodet[1]
                }
                var reqCount = await contract.methods.getReqCount(res.id, i).call();
                var templist = []
                for (let j = 1; j <= reqCount; j++) {
                    var req = await contract.methods.getRequest(res.id, i, j).call();
                    const newReq = {
                        title: req[0],
                        desc: req[1],
                        money: req[2]
                    }
                    templist.push(newReq)
                }
                const sample = {
                    pro: pro,
                    reqs: templist
                }
                reqlist.push(sample)
                console.log(pro, reqlist)

            }

            this.setState({
                reqlist: reqlist
            })


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

        const { reqlist } = this.state;
        var reqsits = null
        if (reqlist !== []) {
            reqsits = reqlist.map((req, key) =>
            (<>
                <h4 key={key}>
                    Project: <b> {req.pro.proname} </b>
                </h4>
                {
                    req.reqs.map((newReq, key) => (
                        <div class="row" key={key}>
                            <div class="col s12 m6">
                                <div class="card blue-grey darken-1">
                                    <div class="card-content white-text">
                                        <span class="card-title">Request: {newReq.title}</span>
                                        <p>{newReq.desc}</p>
                                    </div>
                                    <div class="card-action">
                                        <a href="#">{newReq.money}</a>
                                        <a href="#">This is a link</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </>

            ));
        }

        return (
            <div class="row">
                <DeptDashnav />
                <div class="col s12 m8 l9">
                    <div className="container" style={{ width: "100%" }}>
                        <div style={{ marginTop: "3rem" }} className="row">
                            <div className="col s8 offset-s3">
                                <div className="col s12" style={{ paddingLeft: "4px", marginLeft: "6rem" }}>
                                    <h4>
                                        <b>Requests</b> Board
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        <div>
                            {reqsits === null ? (<div class="preloader-wrapper big active">
                                <div class="spinner-layer spinner-blue-only">
                                    <div class="circle-clipper left">
                                        <div class="circle"></div>
                                    </div><div class="gap-patch">
                                        <div class="circle"></div>
                                    </div><div class="circle-clipper right">
                                        <div class="circle"></div>
                                    </div>
                                </div>
                            </div>) : reqsits}
                        </div>
                    }
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


export default withRouter(RequestsList);