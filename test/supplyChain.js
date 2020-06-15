const SupplyChain = artifacts.require('../contracts/coffeebase/SupplyChain.sol');


describe('Coffee Bean Supply Chain', () => {
    contract('SupplyChain', accounts => {

        let sku = 1;
        let upc = 1;
        let itemState = 0;

        const onwerID = accounts[0];
        const originFarmerID = accounts[1];
        const originFarmName = `Sameer's Farm`;
        const originFarmInformation = 'Located in Los Angeles, California. The best coffee beans in the western hemisphere.';
        const originFarmLatitude = "-38.239770";
        const originFarmLongitude = "144.341490";

        const distributorID = accounts[2];
        const retailerID = accounts[3];
        const consumerID = accounts[4];

        const productNotes = 'Sameer Original Blend Coffee Beans';
        const productPrice = web3.toWei(1, 'ether');
        let productID = sku + upc;

        const emptyAddress = '0x00000000000000000000000000000000000000';

        it('logs', () => console.log(accounts));
    });
});