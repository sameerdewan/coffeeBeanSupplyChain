import React, {createContext} from 'react';


const Context = createContext(undefined);

export class ContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            web3Initialized: false,
            contractInitialized: false
        };
        this.web3 = undefined;
        this.meta = undefined;
        this.account = undefined;
    }

    componentDidMount() {
        
    }

    actions = {
        
    }

    render() {
        const state = this.state;
        const actions = this.actions;
        const web3 = this.web3;
        const meta = this.meta;
        const account = this.account;
        return (
            <Context.Provider value={{state, actions, web3, meta, account}}>
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
