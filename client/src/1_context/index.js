import React, {createContext} from 'react';
import Web3 from 'web3';
import supplyChainArtifact from '../../../build/contracts/SupplyChain.json';


const Context = createContext(undefined);

export class ContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            web3Enabled: false,
            deployedAddress: null,
        };
        this.web3 = undefined;
        this.account = undefined;
        this.abi = supplyChainArtifact.abi;
        this.bytecode = supplyChainArtifact.bytecode;
    }

    componentDidMount() {
        if (window.ethereum) {
            this.web3 = new Web3(window.ethereum);
            this.enableWeb3();
        }
    }

    async enableWeb3() {
        await window.ethereum.enable();
        const accounts = await this.web3.eth.getAccounts();
        this.account = accounts[0];
        this.setState({web3Enabled: true});
    }

    actions = {
        setDeployedAddress: (address) => this.setState({deployedAddress: address})
    }

    render() {
        const state = this.state;
        const actions = this.actions;
        const web3 = this.web3;
        const account = this.account;
        const abi = this.abi;
        const bytecode = this.bytecode;
        return (
            <Context.Provider value={{state, actions, web3, account, abi, bytecode}}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

ContextProvider.contextType = Context;

export function withContext(Component) {
	return function contextComponent(props) {
		return (
			<Context.Consumer>
				{context => <Component {...{...props, ...context}} />}
			</Context.Consumer>
		)
	}
}
