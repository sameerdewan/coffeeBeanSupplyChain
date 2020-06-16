import React, {createContext} from 'react';


const Context = createContext(undefined);

export class ContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            test: 'testVal'
        };
    }

    actions = {

    }

    render() {
        const state = this.state;
        const actions = this.actions;
        return (
            <Context.Provider value={{state, actions}}>
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
