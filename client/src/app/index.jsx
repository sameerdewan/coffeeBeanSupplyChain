import React from 'react';
import {withContext} from '../context';


function App({state, actions}) {
  return (
    <div>
      app is running...
    </div>
  );
}

export default withContext(App);
