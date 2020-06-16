import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {ContextProvider} from './1_context';
import App from './2_app';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <BrowserRouter>
       <ContextProvider>
            <App/>
        </ContextProvider>
    </BrowserRouter>,
    document.getElementById('root')
);