import React from 'react';
import {withContext} from '../context';
import {withRouter} from 'react-router-dom';

function App({state, actions}) {
  return (
    <div>
      app is running...
    </div>
  );
}

export default withRouter(withContext(App));
