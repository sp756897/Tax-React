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
            web3: this.props.web3,
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
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        catch (err) {
            toast.error('Already Vote Registered!', {
                position: "top-right",
                autoClose: 2000,
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

        const { votelist, web3 } = this.state;

        const votesits = votelist.map((dept, key) =>
        (
            <div class="row" key={key} style={{ padding: "3rem" }}>
                <h6 key={key} style={{ fontFamily: "caudex", fontSize: "27px" }}>
                    Department <b> {dept.dept.deptname} </b>
                </h6>
                {
                    dept.pros.map((pro, key1) => (
                        <div class="row z-depth-3" key={key1} >
                            <table class="highlight responsive-table centered" style={{ padding: "3rem", marginLeft: "2rem" }}>
                                <thead>
                                    <tr>
                                        <th>Project</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Money</th>
                                        <th>Voters</th>
                                        <th>Granted</th>
                                    </tr>
                                </thead>
                                {
                                    pro.reqs.map((newReq, key2) => (
                                        !newReq.granted ? (
                                            <tbody>
                                                <tr>
                                                    <td style={{
                                                        overflow: "hidden",
                                                        maxWidth: "10ch",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap"
                                                    }}>{pro.pro.proname} </td>
                                                    <td style={{
                                                        overflow: "hidden",
                                                        maxWidth: "10ch",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap"
                                                    }}>{newReq.title} </td>
                                                    <td style={{
                                                        overflow: "hidden",
                                                        maxWidth: "10ch",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap"
                                                    }}>{newReq.desc}</td>
                                                    <td>{web3.utils.fromWei(newReq.money, "ether")}</td>
                                                    <td>{newReq.voters}</td>
                                                    <td>
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
                                                            Vote                                            </button>
                                                    </td>
                                                </tr>
                                            </tbody>

                                        )

                                            : ""
                                    ))
                                }
                            </table>
                        </div>
                    )
                    )
                }
            </div>
        ))

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
                    {votesits.length !== 0 ? votesits : (<h5>No Requests Created Yet!</h5>)}
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
        );
    }
}


export default withRouter(Vote);