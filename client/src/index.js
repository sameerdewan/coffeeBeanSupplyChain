import React from 'react';
import ReactDOM from 'react-dom';
import {ContextProvider} from './context';
import App from './app';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <ContextProvider>
        <App/>
    </ContextProvider>,
    document.getElementById('root')
);