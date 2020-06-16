import React from 'react';
import {withRouter} from 'react-router-dom';
import {withContext} from '../1_context';
import Loader from './components/Loader';
import Navigation from './components/Navigation';
import Routes from '../3_routes';
import './index.css';

function App(props) {
  if (props.state.web3Enabled === false || props.state.loading === true) {
    return <Loader />;
  }
  return (
    <div>
      <Navigation />
      <br/><br/><br/>
      <Routes />
    </div>
  );
}

export default withRouter(withContext(App));
