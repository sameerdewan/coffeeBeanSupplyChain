import React from 'react';
import {withRouter} from 'react-router-dom';
import {withContext} from '../1_context';
import Loader from './components/Loader';
import Routes from '../3_routes';
import './index.css';

function App(props) {
  if (props.state.web3Enabled === false || props.state.loading === true) {
    return <Loader />;
  }
  return (
    <div>
      app is running...
      <Routes />
    </div>
  );
}

export default withRouter(withContext(App));
