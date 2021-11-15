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

    onSubmit = async (e) => {
        e.preventDefault();
        const { accounts, contract, res, web3 } = this.state;

        const taxSal = Math.floor(res.salary * 0.18)
        let strtax = taxSal.toString()
        const weiTax = web3.utils.toWei(strtax, "ether")

        try {
            await contract.methods.payTax().send({ from: accounts[0], value: weiTax });

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
        const { res, web3 } = this.state;

        const taxes = ["Transportation", "Consumer"]
        const taxList = taxes.map((val, key) => (
            <div key={key} class="col s12 m8 l9" style={{ marginTop: "1rem" }}>
                <div className="col s12 center-align">
                    <div>
                        <h4>
                            {val}
                        </h4>
                        <div class="card-panel #eceff1 blue-grey lighten-5 z-depth-1" style={{ borderWidth: "1px", borderColor: "black", borderBlockStyle: "double" }}>
                            <div class="row valign-wrapper">
                                <div class="col s2">
                                    <i className="material-icons">directions_car</i>
                                </div>
                                <div class="col s10">
                                    <span class="black-text">
                                        Salary : {res.salary} Tax : {web3.utils.fromWei(res.tax, "ether")}
                                    </span>
                                </div>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    onClick={this.onSubmit}
                                    className="btn btn-small waves-effect waves-light hoverable blue accent-3"
                                >
                                    {res.tax > 0 ? "Paid" : "Pay"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ));

        return (
            <div class="row">
                <Dashnav />
                {taxList}
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