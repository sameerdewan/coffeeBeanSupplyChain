import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {withContext} from '../../1_context';


function ManageContractAddress(props) {
    // useEffect(() => {
    //     (async function() {
    //         const networkId = await props.web3.eth.net.getId();
    //         const deployedNetwork = props.supplyChainArtifact.networks[networkId];
    //         const contract = props.web3.eth.Contract(deployedNetwork_jsonInterface, deployedNetwork.address);
    //     })();
    // }, []);
    console.log({contract: props.state.deployedContract})
    return (
        <div>{props.match.params.address}</div>
    )
}

export default withRouter(withContext(ManageContractAddress));