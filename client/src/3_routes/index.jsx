import React from 'react';
import {Switch, Route} from 'react-router-dom';
import DeployContract from './DeployContract';
import ManageContract from './ManageContract';
import ManageContractAddress from './ManageContractAddress';


function Routes() {
    return (
        <Switch>
            <Route exact path={'/deploy'}>
                <DeployContract />
            </Route>
            <Route exact path={'/manage'}>
                <ManageContract />
            </Route>
            <Route exact path={'/manage/:address'}>
                <ManageContractAddress />
            </Route>
        </Switch>
    )
}

export default Routes;