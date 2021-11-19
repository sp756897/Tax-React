import React, { Component } from "react";
import { Link } from "react-router-dom";
import ipfs from "../../Ipfs";
import "../../App.css"
import frontImg from "../../assets/front.jpg"

class Landing extends Component {

    constructor(props) {
        super(props)
        this.state = {
            accounts: this.props.accounts,
            contract: this.props.contract,
            act: []
        }
    }

    async componentDidMount() {
        const { accounts, contract } = this.state
        let acthash = await contract.methods.gethash().call();
        let js = []
        if (acthash !== "") {
            await ipfs.files.cat(acthash).then(data => {
                console.log(data.toString())
                console.log(JSON.parse(data.toString()))
                let d = data.toString()
                try {
                    JSON.parse(d).map((val, key) => (
                        js.push(val)
                    ));
                    console.log(js)
                }
                catch {
                    js.push(JSON.parse(d))
                }

            }
            )
            this.setState({
                act: js
            })
        }
    }

    render() {
        const { act } = this.state;


        const actlist = act === [] ? null : act.map((val, key) => (
            <ul class="collection" style={{ borderRadius: "30px" }}>
                <li class="collection-item">We congratulate {val.name} for paying {val.tax} eth as tax on {val.date}</li>
            </ul>
        ));


        return (
            <div class="row">
                <div style={{ height: "75vh", paddingBottom: "6rem" }} className="valign-wrapper">
                    <div className="row" style={{ paddingTop: "20rem", paddingBottom: "10rem" }}>
                        <div className="col s12 center-align">
                            <div class="" >
                                <div class="col s6 left-align" style={{ backgroundColor: "lightskyblue", padding: "2rem", borderRadius: "30px" }}>
                                    <h6 style={{ fontWeight: "bold", fontSize: "40px", fontFamily: "caudex" }}>Taxonomy</h6>
                                    <p style={{ fontWeight: "", fontSize: "33px", fontFamily: "caudex" }}>Welcome to your Tax management and Distribution System Completed maintained, managed and nurtored on Blockchain for Security and Integrity</p>
                                    <div className="col s4">
                                        <Link
                                            to="/register"
                                            style={{
                                                width: "140px",
                                                borderRadius: "30px",
                                                letterSpacing: "1.5px"
                                            }}
                                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                    <div className="col s4">
                                        <Link
                                            to="/login"
                                            style={{
                                                width: "140px",
                                                borderRadius: "30px",
                                                letterSpacing: "1.5px"
                                            }}
                                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                        >
                                            Log In
                                        </Link>
                                    </div>
                                    <div className="col s4">
                                        <Link
                                            to="/deptlogin"
                                            style={{
                                                width: "140px",
                                                borderRadius: "30px",
                                                letterSpacing: "1.5px"
                                            }}
                                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                        >
                                            DeptLogIn
                                        </Link>
                                    </div>


                                </div>
                            </div>
                            <div class="col s6">
                                <img src={frontImg} style={{ objectFit: "cover", width: "100%", height: "100%" }}></img>
                            </div>
                        </div>
                    </div>
                </div>
                {actlist !== null ? (<div class="container center-align" style={{ paddingTop: "2rem" }} >
                    <div class="row">
                        <div class="">

                            <div class="card blue z-depth-3" style={{ padding: "2rem", width: "100%", borderRadius: "18px" }}>
                                {actlist}
                            </div>
                        </div>
                    </div>
                </div>) : ""}
            </div>
        );
    }
}
export default Landing;