import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class DeptLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: {},
            accounts: this.props.accounts,
            contract: this.props.contract,
            deptauth: this.props.deptauth,
        };
    }

    componentDidMount() {

    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = async (e) => {
        e.preventDefault();
        const { accounts, contract } = this.state;

        const res = await contract.methods.getHead(accounts[0]).call();

        console.log(res[0])

        const depthead = {
            id: res[0],
            deptname: res[1]
        }

        if (res[0] != 0) {
            console.log("Signed On Department")
            console.log("res:", JSON.stringify(depthead))
            this.props.deptfunc(depthead)
            localStorage.setItem("deptData", JSON.stringify(depthead));
            this.props.history.push("/deptdashboard");
        }
        else {
            console.log("Please Sign Up")
        }
    };
    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div style={{ marginTop: "4rem" }} className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/" className="btn-flat waves-effect">
                            <i className="material-icons left">keyboard_backspace</i> Back to
                            home
                        </Link>
                        <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                            <h4>
                                <b>Login</b> below
                            </h4>
                            <p className="grey-text text-darken-1">
                                Don't have an account? Go Home Senor
                            </p>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    error={errors.email}
                                    id="email"
                                    type="email"
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field col s12">
                                <input
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    error={errors.password}
                                    id="password"
                                    type="password"
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                                <button
                                    style={{
                                        width: "150px",
                                        borderRadius: "3px",
                                        letterSpacing: "1.5px",
                                        marginTop: "1rem"
                                    }}
                                    type="submit"
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default withRouter(DeptLogin);