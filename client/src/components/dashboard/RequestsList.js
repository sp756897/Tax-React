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
            reqlist: [],
            reqCount: 0,
            payerCount: 0
        }
    }

    async componentDidMount() {
        const { contract, res, web3 } = this.state;

        try {
            var reqCount = 0
            var payerCount = await contract.methods.getPayerCount().call();
            var procount = await contract.methods.getProcount(res.id).call();
            var reqlist = []
            for (let i = 1; i <= procount; i++) {
                var prodet = await contract.methods.getProject(res.id, i).call();
                const pro = {
                    proname: prodet[0],
                    proreq: prodet[1]
                }
                reqCount = await contract.methods.getReqCount(res.id, i).call();
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
                if (reqCount > 0) {
                    reqlist.push(sample)
                }

            }

            this.setState({
                reqlist: reqlist,
                reqCount: reqCount,
                payerCount: payerCount
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

    onSubmit = async (deptid, proid, reqid, e) => {
        e.preventDefault()
        const { accounts, contract } = this.state;

        e.preventDefault()
        try {
            await contract.methods.grantFund(deptid, proid, reqid).send({ from: accounts[0] });
            toast.success('🦄 Fund Granted 👍', {
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

        const { reqlist, res, reqCount, payerCount } = this.state;
        const reqsits = reqlist.map((req, key) =>
        (
            <div style={{ padding: "3rem" }}>
                <h6 key={key} style={{ fontFamily: "caudex", fontSize: "27px" }}>
                    Project <b> {req.pro.proname} </b>
                </h6>
                <div class="row z-depth-3">
                    <table class="highlight responsive-table centered" style={{ padding: "3rem", marginLeft: "2rem" }}>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Money</th>
                                <th>Voters / {payerCount}</th>
                            </tr>
                        </thead>
                        {
                            req.reqs.map((newReq, key1) => (
                                <tbody>
                                    <tr>
                                        <td>{newReq.title} </td>
                                        <td style={{
                                            overflow: "hidden",
                                            maxWidth: "10ch",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap"
                                        }}>{newReq.desc}</td>
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
                            ))
                        }
                    </table>
                </div>
            </div>

        ));


        return (
            <div class="row">
                <DeptDashnav />
                <div class="col s12 m8 l9" style={{ padding: "2rem" }} >
                    <div className="container">
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

                        reqsits.length === 0 ? (<div>
                            <h4>No Requests Yet!</h4>
                        </div>) : reqsits

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