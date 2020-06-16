import React from 'react';
import {withRouter} from 'react-router-dom';
import {withContext} from '../1_context';
import Routes from '../4_routes';

function App(props) {
  return (
    <div>
      app is running...
      <Routes />
    </div>
  );
}

export default withRouter(withContext(App));
