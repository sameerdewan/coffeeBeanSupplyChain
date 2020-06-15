const colors = require('colors');


class TestLogger {
    constructor(accounts) {
        this.accounts = accounts;
    }

    initialLog() {
        const ownerID = this.accounts[0];
        const originFarmerID = this.accounts[1];
        const distributorID = this.accounts[2];
        const retailerID = this.accounts[3];
        const consumerID = this.accounts[4];

        console.log('Initializing accounts...'.yellow + '\n');
        console.log('Initialized Accounts:'.green.underline.bold);
        console.log('Owner: '.green.underline + colors.inverse(ownerID));
        console.log('Farmer: '.green.underline + colors.inverse(originFarmerID));
        console.log('Distributor: '.green.underline + colors.inverse(distributorID));
        console.log('Retailer: '.green.underline + colors.inverse(retailerID));
        console.log('Consumer: '.green.underline + colors.inverse(consumerID));
    }

    logParams(params) {
        const {
            originFarmName, 
            originFarmInformation, 
            originFarmLatitude, 
            originFarmLongitude,
            productNotes, 
            productPrice
        } = params;
        console.log('\nInitializing parameters...'.yellow + '\n');
        console.log('Initialized Parameters:'.green.underline.bold);
        console.log('Origin Farm Name: '.green.underline + colors.inverse(originFarmName));
        console.log('Origin Farm Information: '.green.underline + colors.inverse(originFarmInformation));
        console.log('Origin Farm Latitude: '.green.underline + colors.inverse(originFarmLatitude + '°'));
        console.log('Origin Farm Longitude: '.green.underline + colors.inverse(originFarmLongitude + '°'));
        console.log('Product Notes: '.green.underline + colors.inverse(productNotes));
        console.log('Product Price: '.green.underline + colors.inverse(productPrice + ' wei'));
    }

    logTestsStart() {
        console.log('\nBeginning tests...'.yellow + '\n');
        console.log('Tests:'.green.underline.bold);
    }
}

module.exports = {
    TestLogger
}