import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {ContextProvider} from './context';
import App from './app';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <BrowserRouter>
       <ContextProvider>
            <App/>
        </ContextProvider>
    </BrowserRouter>,
    document.getElementById('root')
);