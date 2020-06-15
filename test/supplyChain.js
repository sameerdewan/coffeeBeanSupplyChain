const SupplyChain = artifacts.require('../contracts/coffeebase/SupplyChain.sol');
const {TestLogger} = require('./utils');

describe('Coffee Bean Supply Chain', () => {
    contract('SupplyChain', accounts => {
        
        const testLogger = new TestLogger(accounts);

        let sku = 1;
        let upc = 1;
        let itemState = 0;

        const ownerID = accounts[0];
        const originFarmerID = accounts[1];
        const originFarmName = `Sameer's Farm`;
        const originFarmInformation = 'Located in Los Angeles, California. The best coffee beans in the western hemisphere.';
        const originFarmLatitude = "-38.239770";
        const originFarmLongitude = "144.341490";

        const distributorID = accounts[2];
        const retailerID = accounts[3];
        const consumerID = accounts[4];

        const productNotes = 'Sameer Original Blend Coffee Beans';
        const productPrice = web3.utils.toWei('1', 'ether');
        let productID = sku + upc;

        const emptyAddress = '0x00000000000000000000000000000000000000';

        testLogger.initialLog();
        testLogger.logParams({
            originFarmName, 
            originFarmInformation, 
            originFarmLatitude, 
            originFarmLongitude, 
            productNotes, 
            productPrice
        });
        testLogger.logTestsStart();

        it('should correctly run harvestCoffee()', async () => {
            const supplyChain = await SupplyChain.deployed(originFarmerID, distributorID, retailerID);
        
            let eventEmitted = false;
            
            await supplyChain.Harvested(() => {
                eventEmitted = true;
            })
    
            await supplyChain.harvestCoffee(
                upc, 
                originFarmerID, 
                originFarmName, 
                originFarmInformation, 
                originFarmLatitude, 
                originFarmLongitude, 
                productNotes, 
                { 
                    from: originFarmerID 
                }
            );
    
            const resultCoffeeSupplyChain = await supplyChain.fetchCoffee.call(upc)
    
            assert.equal(resultCoffeeSupplyChain[0], sku, 'Error: Invalid item SKU');
            assert.equal(resultCoffeeSupplyChain[1], upc, 'Error: Invalid item UPC');
            assert.equal(resultCoffeeSupplyChain[2], itemState, 'Error: Invalid itemState');
            assert.equal(resultCoffeeSupplyChain[3], originFarmerID, 'Error: Missing or Invalid ownerID');
            assert.equal(resultCoffeeSupplyChain[4], originFarmerID, 'Error: Missing or Invalid originFarmerID');
            assert.equal(resultCoffeeSupplyChain[5], originFarmName, 'Error: Missing or Invalid originFarmName');
            assert.equal(resultCoffeeSupplyChain[6], originFarmInformation, 'Error: Missing or Invalid originFarmInformation');
            assert.equal(resultCoffeeSupplyChain[7], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude');
            assert.equal(resultCoffeeSupplyChain[8], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude');
            assert.equal(eventEmitted, true, 'Invalid event emitted');      
        });

        it('should correctly run processCoffee()', async () => {
            const supplyChain = await SupplyChain.deployed(originFarmerID, distributorID, retailerID);

            let eventEmitted = false;

            await supplyChain.Processed(() => {
                eventEmitted = true;
            });

            await supplyChain.processCoffee(upc, { from: originFarmerID });

            const resultCoffeeSupplyChain = await supplyChain.fetchCoffee.call(upc);
            assert.equal(Number(resultCoffeeSupplyChain[2]), itemState + 1, 'Error: Invalid item state');
            assert.equal(eventEmitted, true, 'Invalid event emitted');
        });

        it('should correctly run packCoffee()', async () => {
            const supplyChain = await SupplyChain.deployed(originFarmerID, distributorID, retailerID);

            let eventEmitted = false;

            await supplyChain.Packed(() => {
                eventEmitted = true;
            });

            await supplyChain.packCoffee(upc, { from: originFarmerID });

            const resultCoffeeSupplyChain = await supplyChain.fetchCoffee.call(upc);
            assert.equal(Number(resultCoffeeSupplyChain[2]), itemState + 2, 'Error: Invalid item state');
            assert.equal(eventEmitted, true, 'Invalid event emitted');
        });

        it('should correctly run addCoffeeToPalette()', async () => {
            const supplyChain = await SupplyChain.deployed(originFarmerID, distributorID, retailerID);

            let eventEmitted = false;

            await supplyChain.AddedToPalette(() => {
                eventEmitted = true;
            });

            await supplyChain.addCoffeeToPalette(upc, productPrice, { from: originFarmerID });

            const resultCoffeeSupplyChain = await supplyChain.fetchCoffee.call(upc);
            assert.equal(Number(resultCoffeeSupplyChain[2]), itemState + 3, 'Error: Invalid item state');
            assert.equal(eventEmitted, true, 'Invalid event emitted');
        });

        it('should correctly run buyCoffeePalette()', async () => {
            const supplyChain = await SupplyChain.deployed(originFarmerID, distributorID, retailerID);

            let eventEmitted = false;

            await supplyChain.Sold(() => {
                eventEmitted = true;
            });

            await supplyChain.buyCoffeePalette(upc, { from: distributorID, value: productPrice });

            const resultCoffeeSupplyChain = await supplyChain.fetchCoffee.call(upc);
            assert.equal(Number(resultCoffeeSupplyChain[2]), itemState + 4, 'Error: Invalid item state');
            assert.equal(resultCoffeeSupplyChain[3], distributorID, 'Error: Missing or Invalid ownerID');
            assert.equal(resultCoffeeSupplyChain[3], distributorID, 'Error: Missing or Invalid distributorID');
            assert.equal(eventEmitted, true, 'Invalid event emitted');
        });

        it('should correctly run shipCoffeePalette()', async () => {
            const supplyChain = await SupplyChain.deployed(originFarmerID, distributorID, retailerID);

            let eventEmitted = false;

            await supplyChain.Shipped(() => {
                eventEmitted = true;
            });

            await supplyChain.shipCoffeePalette(upc, { from: distributorID });

            const resultCoffeeSupplyChain = await supplyChain.fetchCoffee.call(upc);
            assert.equal(Number(resultCoffeeSupplyChain[2]), itemState + 5, 'Error: Invalid item state');
            assert.equal(eventEmitted, true, 'Invalid event emitted');
        });

        it('should correctly run receiveCoffeePalette()', async () => {
            const supplyChain = await SupplyChain.deployed(originFarmerID, distributorID, retailerID);
    
            let eventEmitted = false;

            await supplyChain.Received(() => {
                eventEmitted = true;
            });

            await supplyChain.receiveCoffeePalette(upc, { from: retailerID });

            const resultCoffeeSupplyChain = await supplyChain.fetchCoffeeHistory.call(upc);
            assert.equal(Number(resultCoffeeSupplyChain[5]), itemState + 6, 'Error: Invalid item state');
            assert.equal(resultCoffeeSupplyChain[0], retailerID, 'Error: Missing or Invalid ownerID');
            assert.equal(resultCoffeeSupplyChain[3], retailerID, 'Error: Missing or Invalid retailerID');
            assert.equal(eventEmitted, true, 'Invalid event emitted');
        });
    });
});

