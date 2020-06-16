import React from 'react';
import ReactDOM from 'react-dom';
import {ContextProvider} from './context';
import App from './app';

ReactDOM.render(
    <ContextProvider>
        <App/>
    </ContextProvider>,
    document.getElementById('root')
);