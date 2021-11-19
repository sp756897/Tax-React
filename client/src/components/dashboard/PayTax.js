import React, { Component } from "react";
import Dashnav from "./DashNav";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ipfs from "../../Ipfs";

class PayTax extends Component {
    constructor(props) {
        super(props)
        this.state = {
            accounts: this.props.accounts,
            contract: this.props.contract,
            res: this.props.res,
            web3: this.props.web3
        }
    }

    componentDidMount() {

    }

    onSubmit = async (taxName, e) => {
        e.preventDefault();
        const { accounts, contract, res, web3 } = this.state;

        const taxSal = Math.floor(res.salary * 0.18)
        let strtax = taxSal.toString()
        const weiTax = web3.utils.toWei(strtax, "ether")

        try {
            await contract.methods.payTax(taxName).send({ from: accounts[0], value: weiTax });

            const resp = await contract.methods.getPayer(accounts[0]).call();

            this.setState({ res: resp });

            let date = new Date()

            const paid = {
                name: res.name,
                tax: strtax,
                date: (date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear())
            }



            let acthash = await contract.methods.gethash().call();
            let js = []
            let buf = null
            let hash = 0
            let t1 = null

            if (acthash !== "") {
                try {
                    await ipfs.files.cat(acthash).then(data => {
                        console.log(data.toString())
                        console.log(JSON.parse(data.toString()))
                        let d = data.toString()

                        JSON.parse(d).map((val, key) => (
                            js.push(val)
                        ));
                        console.log(js)
                        js.push(paid)
                    }
                    )
                }
                catch {
                    js.push(paid)
                }

                t1 = JSON.stringify(js)
            }
            else {
                t1 = JSON.stringify(paid)

            }

            buf = Buffer.from(t1)
            hash = 0


            await ipfs.files.add(buf)
                .then(result => {
                    console.log(result)
                    console.log(result[0].hash)
                    hash = result[0].hash
                }
                )

            await contract.methods.sethash(hash).send({ from: accounts[0] });

            toast.success('🦄 Tax Paid 👍', {
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
        const { res, web3 } = this.state;


        const taxes = ["Income", "Transportation"]
        const taxList = taxes.map((val, key) => (
            <div class="">
                <div key={key} class="col s12 m8 l8" style={{ paddingBottom: "2rem" }}>
                    <ul class="collection z-depth-3" style={{ padding: "2rem" }}>
                        <li class="collection-item avatar">
                            <li class="collection-header" style={{ fontWeight: "bold" }}><h6><b>{val}</b></h6></li>
                            <p>Your Salary is {res.salary} eth <br></br>
                                You have paid {key == 0 ? web3.utils.fromWei(res.incomeTax, "ether") : web3.utils.fromWei(res.transportTax, "ether")} eth as Tax
                            </p>
                            <div class="valign-wrapper">
                                <div class="secondary-content">
                                    <button
                                        style={{
                                            width: "150px",
                                            borderRadius: "3px",
                                            letterSpacing: "1.5px",
                                            marginTop: "1rem",
                                            float: "right"
                                        }}
                                        onClick={(e) => this.onSubmit((key + 1), e)}
                                        className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                                    >
                                        {
                                            key == 0 ? (res.incomeTax > 0 ? "Paid" : "Pay") : (res.transportTax > 0 ? "Paid" : "Pay")
                                        }
                                    </button>
                                </div>
                            </div>

                        </li>
                    </ul>

                </div>
            </div>
        ));

        return (
            <div class="row">
                <Dashnav />
                <div class="">
                    {taxList}
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

export default PayTax;