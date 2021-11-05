import React, { Component } from "react";

class MyComp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            contract: this.props.contract,
            accounts: this.props.accounts,
            storageValue: 0
        }
    }

    componentDidMount() {
    }

    signUp = async () => {
        const { accounts, contract } = this.state;

        // Stores a given value, 5 by default.
        await contract.methods.set(10000).send({ from: accounts[0] });

        // Get the value from the contract to prove it worked.
        const response = await contract.methods.get().call();

        // Update state with the result.
        this.setState({ storageValue: response });
    };

    render() {
        return (
            <div>
                <h1>Hi</h1>
                <h1>{this.state.storageValue}</h1>
            </div>
        )
    }
}

export default MyComp;