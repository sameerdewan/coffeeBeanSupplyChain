import React from 'react';
import {Switch} from 'react-router-dom';
import InitializeContract from './InitializeContract';


function Routes() {
    return (
        <Switch>
            <InitializeContract />
        </Switch>
    )
}

export default Routes;