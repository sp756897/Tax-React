import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import DeptDashnav from "./DeptDashnav";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class RequestsList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            web3: this.props.web3,
            accounts: this.props.accounts,
            contract: this.props.contract,
            res: this.props.res,
            reqlist: []
        }
    }

    async componentDidMount() {
        const { contract, res, web3 } = this.state;

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
                    let strtax = req[2].toString()
                    const weiTax = web3.utils.fromWei(strtax, "ether")
                    const newReq = {
                        title: req[0],
                        desc: req[1],
                        money: weiTax,
                        voters: req[3],
                        granted: req[4]
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

    onSubmit = async (deptid, proid, reqid, e) => {
        e.preventDefault()
        const { accounts, contract } = this.state;

        e.preventDefault()
        try {
            console.log(deptid, proid, reqid)
            await contract.methods.grantFund(deptid, proid, reqid).send({ from: accounts[0] });
            toast.success('🦄 Fund Granted 👍', {
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
        }
    }

    render() {

        const { reqlist, res } = this.state;
        var reqsits = null
        if (reqlist !== []) {
            reqsits = reqlist.map((req, key) =>
            (<div class="row z-depth-4">
                <h4 key={key}>
                    Project: <b> {req.pro.proname} </b>
                </h4>
                <div class="row">
                    <table class="highlight">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Money</th>
                                <th>Voters</th>
                            </tr>
                        </thead>
                    </table>
                </div>
                {
                    req.reqs.map((newReq, key1) => (
                        <div class="row" key={key1}>
                            <table class="highlight responsive-table">
                                <tbody>
                                    <tr>
                                        <td>{newReq.title} </td>
                                        <td>{newReq.desc}</td>
                                        <td>{newReq.money}</td>
                                        <td>{newReq.voters}</td>
                                        <td>
                                            <button
                                                style={{
                                                    width: "150px",
                                                    borderRadius: "3px",
                                                    letterSpacing: "1.5px",
                                                    marginTop: "1rem"
                                                }}
                                                onClick={(e) => this.onSubmit(res.id, (key + 1), (key1 + 1), e)}
                                                className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                                            >
                                                {newReq.granted ? "Granted" : "Grant"}
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ))
                }

            </div>

            ));
        }

        return (
            <div class="row">
                <DeptDashnav />
                <div class="col s12 m8 l9">
                    <div class="container" >
                        <div class="row">
                            <div >
                                <div >
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