import React, { Component } from "react";
import { Link } from "react-router-dom";
import ipfs from "../../Ipfs";
import "../../App.css"

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
            <ul class="collection">
                <li class="collection-item">Name: {val.name} Tax: {val.tax} Date: {val.date}</li>
            </ul>
        ));


        return (
            <div class="row">
                <iframe src="https://giphy.com/embed/9JxkPTP3alOykb8PmQ" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/trippy-gif-artist-ericaofanderson-9JxkPTP3alOykb8PmQ">via GIPHY</a></p>
                <div style={{ height: "75vh" }} className="container valign-wrapper">
                    <div className="row">
                        <div className="col s12 center-align">
                            <h4>
                                <b>Build</b> a login/auth app with the{" "}
                                <span style={{ fontFamily: "monospace" }}>MERN</span> stack from
                                scratch
                            </h4>
                            <p className="flow-text grey-text text-darken-1">
                                Create a (minimal) full-stack app with user authentication via
                                passport and JWTs
                            </p>
                            <br />
                            <div className="col s6">
                                <Link
                                    to="/register"
                                    style={{
                                        width: "140px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px"
                                    }}
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                    Register
                                </Link>
                            </div>
                            <div className="col s6">
                                <Link
                                    to="/login"
                                    style={{
                                        width: "140px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px"
                                    }}
                                    className="btn btn-large btn-flat waves-effect white black-text"
                                >
                                    Log In
                                </Link>
                            </div>
                            <div className="col s6">
                                <Link
                                    to="/deptlogin"
                                    style={{
                                        width: "140px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px"
                                    }}
                                    className="btn btn-large btn-flat waves-effect white black-text"
                                >
                                    Dept Log In
                                </Link>
                            </div>
                            <div className="col s6">
                                <Link
                                    to="/deptregister"
                                    style={{
                                        width: "140px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px"
                                    }}
                                    className="btn btn-large btn-flat waves-effect white black-text"
                                >
                                    Dept Register
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                {actlist !== null ? (<div class="container center-align">
                    <div class="row">
                        <div class="">
                            <div class="card blue z-depth-3" style={{ padding: "2rem", width: "100%" }}>
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