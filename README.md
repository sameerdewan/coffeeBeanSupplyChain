# Coffee Bean Supply Chain
This project is for the Udacity Blockchain Program Ethereum DAPP for Tracking Items through a Supply Chain. 

This project is slightly modified from the original criteria and expands on the ability of the user while maintaining the goals of the original project in this iteration. Details will be found below.
## Project Specifications
Truffle v5.1.26 (core: 5.1.26)
Solidity - ^0.6.0 (solc-js)
Node v10.16.3
Web3.js v1.2.1
## How to Test
First, run the following:

    truffle develop
Next, in the truffle terminal, run:

    test

## How to build the application
The client is built using React (create-react-app) and the main outer application is bootstrapped with npm. You should run the following command in both the outer application **and** inside the client folder:

    npm install

You can then from inside the client folder run `npm start` or from the outer application folder run `npm run client`. Either will work.
##  Key Differences from Original Criteria of project
This project utilizes the latest open-zeppelin contracts and hdwallet provider package, as can be seen in the outer application folder package.json

    "@openzeppelin/contracts": "3.0.2"
    "@truffle/hdwallet-provider": "1.0.35"

The key difference is that instead of creating individual roles from scratch like the course has outlined, the latest open zeppelin contracts `AccessControl` contract allows creation of roles dynamically using `grantRole` function. Because of this, using the latest open-zeppelin, I did not need to create individual roles from scratch, rather could incorporate them into the main supply chain contract with significantly less code overhead to maintain, all while retaining the same behavior intended for the supply chain contract.

The web application does draw from a deployed contract, however, for this iteration, I request the user to use the UI to deploy `their own instance of this contract` with addresses they provide for the farmer, distributor, retailer, and consumer. From the UI, the Ethereum address that `deploys this instance will be the owner of the contract.` You must have 5 ethereum addresses ready in advance to bootstrap the contract deployed, all with sufficient ether.

The flow is as follows:

 1. Deploy a supply chain contract instance from the UI
 2. Go to Manage the contract via using the contract stored in your local storage or by uploading the metadata you were prompted to download after deploying your instance in step 1.
 3. As the owner of the contract, you should view the owner UI.
 4. Change your address to the farmer address and refresh the page, you should have access to a farmer based UI on the manage contract page after uploading the contract again / using the local storage stored contract.
 5. Continue through the roles (farmer, distributor, retailer, consumer) as you did in step 4 to confirm that the UI changes and you have access to the supply chain role abilities to reflect your current in use metamask wallet.

