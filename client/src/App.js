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
      res: null
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

      console.log(contract)

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
  }


  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <Router history={History}>
        <div className="App">
          <Navbar />
          <button onClick={this.cli}>Connect</button>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={() => <Register contract={this.state.contract} accounts={this.state.accounts} />} />
          <Route exact path="/login" component={() => <Login contract={this.state.contract} accounts={this.state.accounts} auth={this.state.auth} func={this.authenticate} />} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={() => <Dashboard contract={this.state.contract} accounts={this.state.accounts} auth={this.state.auth} res={this.state.res} func={this.authenticate} />} isAuthenticated={this.state.auth} />
            <PrivateRoute exact path="/paytax" component={() => <PayTax contract={this.state.contract} accounts={this.state.accounts} res={this.state.res} />} isAuthenticated={this.state.auth} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
