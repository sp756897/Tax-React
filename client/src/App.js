import React, { Component } from "react";
import Tax from "./contracts/Tax.json"
import getWeb3 from "./getWeb3";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import History from "./utils/History";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import PayTax from "./components/dashboard/PayTax";
import DeptLogin from "./components/auth/DeptLogin";
import DeptDashboard from "./components/dashboard/DeptDashboard";
import DeptRegister from "./components/auth/DeptRegister";
import CreatePro from "./components/dashboard/CreatePro";
import Projects from "./components/dashboard/Projects";
import Request from "./components/dashboard/Request";
import RequestsList from "./components/dashboard/RequestsList";
import Vote from "./components/dashboard/Vote";
import Logout from "./components/dashboard/Logout";
import DeptLogout from "./components/dashboard/DeptLogout";
import PrivateRoute from "./utils/PrivateRoute";
import "./App.css";

class App extends Component {
  constructor() {
    super()
    this.state = {
      web3: null,
      accounts: null,
      contract: null,
      auth: false,
      deptauth: false,
      res: null,
      dres: null
    }
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Tax.networks[networkId];
      const contract = new web3.eth.Contract(
        Tax.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract });


    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  authenticate = (data) => {
    this.setState({
      auth: true,
      res: data
    });
    console.log(this.state.auth)
  }

  notauthenticate = () => {
    this.setState({
      auth: false,
      res: null
    });
    localStorage.removeItem("userData")
  }

  deptauthenticate = (data) => {
    this.setState({
      deptauth: true,
      dres: data
    });
  }

  notdeptauthenticate = () => {
    this.setState({
      deptauth: false,
      dres: null
    });
    localStorage.removeItem("deptdata")
  }


  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <Router history={History}>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={() => <Landing contract={this.state.contract} accounts={this.state.accounts} />} />
          <Route exact path="/register" component={() => <Register contract={this.state.contract} accounts={this.state.accounts} />} />
          <Route exact path="/login" component={() => <Login contract={this.state.contract} accounts={this.state.accounts} auth={this.state.auth} func={this.authenticate} notauth={this.notauthenticate} />} />
          <Route exact path="/deptlogin" component={() => <DeptLogin contract={this.state.contract} accounts={this.state.accounts} deptauth={this.state.deptauth} deptfunc={this.deptauthenticate} />} />
          <Route exact path="/deptregister" component={() => <DeptRegister contract={this.state.contract} accounts={this.state.accounts} />} />

          <Switch>
            <PrivateRoute exact path="/dashboard" component={() => <Dashboard web3={this.state.web3} contract={this.state.contract} accounts={this.state.accounts} auth={this.state.auth} res={this.state.res} func={this.notauthenticate} />} isAuthenticated={this.state.auth} />
            <PrivateRoute exact path="/paytax" component={() => <PayTax web3={this.state.web3} contract={this.state.contract} accounts={this.state.accounts} res={this.state.res} />} isAuthenticated={this.state.auth} />
            <PrivateRoute exact path="/vote" component={() => <Vote web3={this.state.web3} contract={this.state.contract} accounts={this.state.accounts} res={this.state.res} />} isAuthenticated={this.state.auth} />
            <PrivateRoute exact path="/logout" component={() => <Logout func={this.notauthenticate} />} isAuthenticated={this.state.auth} />

            <PrivateRoute exact path="/deptdashboard" component={() => <DeptDashboard contract={this.state.contract} accounts={this.state.accounts} res={this.state.dres} deptfunc={this.notdeptauthenticate} />} isAuthenticated={this.state.deptauth} />
            <PrivateRoute exact path="/createproject" component={() => <CreatePro contract={this.state.contract} accounts={this.state.accounts} res={this.state.dres} />} isAuthenticated={this.state.deptauth} />
            <PrivateRoute exact path="/projects" component={() => <Projects contract={this.state.contract} accounts={this.state.accounts} res={this.state.dres} />} isAuthenticated={this.state.deptauth} />
            <PrivateRoute exact path="/request" component={() => <Request web3={this.state.web3} contract={this.state.contract} accounts={this.state.accounts} res={this.state.dres} />} isAuthenticated={this.state.deptauth} />
            <PrivateRoute exact path="/requestslist" component={() => <RequestsList web3={this.state.web3} contract={this.state.contract} accounts={this.state.accounts} res={this.state.dres} />} isAuthenticated={this.state.deptauth} />
            <PrivateRoute exact path="/deptlogout" component={() => <DeptLogout func={this.notdeptauthenticate} />} isAuthenticated={this.state.deptauth} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
