import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Dashnav from "./DashNav";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Vote extends Component {

    constructor(props) {
        super(props)
        this.state = {
            accounts: this.props.accounts,
            contract: this.props.contract,
            res: this.props.res,
            votelist: []
        }
    }

    onSubmit = async (deptid, proid, reqid, e) => {
        const { accounts, contract } = this.state;

        e.preventDefault()
        try {
            console.log(deptid, proid, reqid)
            await contract.methods.voteforPro(deptid, proid, reqid).send({ from: accounts[0] });
            toast.success('🦄 Vote Registered 👍', {
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

    async componentDidMount() {
        const { contract } = this.state;

        try {

            var votelist = []

            var deptCount = await contract.methods.getDeptcount().call();
            for (let k = 1; k <= deptCount; k++) {
                var dept = await contract.methods.getdept(k).call();
                var procount = await contract.methods.getProcount(k).call();
                console.log(procount)
                var deptdet = {
                    deptid: dept[0],
                    deptname: dept[1]
                }
                var protemplist = []

                for (let i = 1; i <= procount; i++) {
                    var prodet = await contract.methods.getProject(k, i).call();
                    var pro = {
                        proname: prodet[0],
                        proreq: prodet[1]
                    }

                    var reqCount = await contract.methods.getReqCount(k, i).call();
                    var templist = []

                    for (let j = 1; j <= reqCount; j++) {
                        var req = await contract.methods.getRequest(k, i, j).call();
                        var newReq = {
                            title: req[0],
                            desc: req[1],
                            money: req[2],
                            voters: req[3],
                            granted: req[4]
                        }
                        templist.push(newReq)
                    }

                    var newPro = {
                        pro: pro,
                        reqs: templist
                    }
                    protemplist.push(newPro)
                }

                var newDept = {
                    dept: deptdet,
                    pros: protemplist
                }
                votelist.push(newDept)
            }

            console.log(votelist)

            this.setState({
                votelist: votelist
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

        const { votelist } = this.state;

        const votesits = votelist.map((dept, key) =>
        (
            <div class="row" key={key} >
                <h4>Department: <b>{dept.dept.deptname}</b> </h4>
                {
                    dept.pros.map((pro, key1) => (
                        <div class="row" key={key1} >
                            <h4>Project: <b>{pro.pro.proname}</b></h4>
                            {
                                pro.reqs.map((req, key2) => (
                                    !req.granted ? (
                                        <div class="row" key={key2} >
                                            <div class="col s12 m8 offset-m2 l6 offset-l3" key={key}>
                                                <div class="card-panel #eceff1 blue-grey lighten-5 z-depth-1" style={{ borderWidth: "1px", borderColor: "black", borderBlockStyle: "double" }}>
                                                    <div class="row valign-wrapper">
                                                        <div class="col s10">
                                                            <span class="black-text">
                                                                {req.title}
                                                            </span>
                                                        </div>
                                                        <button
                                                            style={{
                                                                width: "150px",
                                                                borderRadius: "3px",
                                                                letterSpacing: "1.5px",
                                                                marginTop: "1rem"
                                                            }}
                                                            onClick={(e) => this.onSubmit(dept.dept.deptid, (key1 + 1), (key2 + 1), e)}
                                                            className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                                                        >
                                                            Vote
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>)
                                        : ""
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        ));

        return (
            <div class="row">
                <Dashnav />
                <div class="col s12 m8 l9">
                    <div className="container">
                        <div style={{ marginTop: "3rem" }} className="row">
                            <div className="col s8 offset-s3">
                                <div className="col s12" style={{ paddingLeft: "4px", marginLeft: "6rem" }}>
                                    <h4>
                                        <b>Voting</b> Board
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col s12 center-align">
                        {votelist ? votesits : ""}
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


export default withRouter(Vote);