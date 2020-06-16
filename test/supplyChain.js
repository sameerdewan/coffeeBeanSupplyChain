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

        const productName = 'Coffee';
        const productPrice = web3.utils.toWei('1', 'ether');
        
        testLogger.initialLog();
        testLogger.logParams({
            originFarmName, 
            originFarmInformation, 
            originFarmLatitude, 
            originFarmLongitude, 
            productName, 
            productPrice
        });
        testLogger.logTestsStart();

        it('should correctly run harvest()', async () => {
            const supplyChain = await SupplyChain.deployed(originFarmerID, distributorID, retailerID);
        
            let eventEmitted = false;
            
            await supplyChain.Harvested(() => {
                eventEmitted = true;
            })
    
            await supplyChain.harvest(
                upc, 
                originFarmerID, 
                originFarmName, 
                originFarmInformation, 
                originFarmLatitude, 
                originFarmLongitude, 
                productName,
                { 
                    from: originFarmerID 
                }
            );
    
            const resultCoffeeSupplyChain = await supplyChain.fetchProduct.call(upc)
    
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

        it('should correctly run process()', async () => {
            const supplyChain = await SupplyChain.deployed(originFarmerID, distributorID, retailerID);

            let eventEmitted = false;

            await supplyChain.Processed(() => {
                eventEmitted = true;
            });

            await supplyChain.process(upc, { from: originFarmerID });

            const resultCoffeeSupplyChain = await supplyChain.fetchProduct.call(upc);
            assert.equal(Number(resultCoffeeSupplyChain[2]), itemState + 1, 'Error: Invalid item state');
            assert.equal(eventEmitted, true, 'Invalid event emitted');
        });

        it('should correctly run pack()', async () => {
            const supplyChain = await SupplyChain.deployed(originFarmerID, distributorID, retailerID);

            let eventEmitted = false;

            await supplyChain.Packed(() => {
                eventEmitted = true;
            });

            await supplyChain.pack(upc, { from: originFarmerID });

            const resultCoffeeSupplyChain = await supplyChain.fetchProduct.call(upc);
            assert.equal(Number(resultCoffeeSupplyChain[2]), itemState + 2, 'Error: Invalid item state');
            assert.equal(eventEmitted, true, 'Invalid event emitted');
        });

        it('should correctly run addToPalette()', async () => {
            const supplyChain = await SupplyChain.deployed(originFarmerID, distributorID, retailerID);

            let eventEmitted = false;

            await supplyChain.AddedToPalette(() => {
                eventEmitted = true;
            });

            await supplyChain.addToPalette(upc, productPrice, { from: originFarmerID });

            const resultCoffeeSupplyChain = await supplyChain.fetchProduct.call(upc);
            assert.equal(Number(resultCoffeeSupplyChain[2]), itemState + 3, 'Error: Invalid item state');
            assert.equal(eventEmitted, true, 'Invalid event emitted');
        });

        it('should correctly run buyPalette()', async () => {
            const supplyChain = await SupplyChain.deployed(originFarmerID, distributorID, retailerID);

            let eventEmitted = false;

            await supplyChain.Sold(() => {
                eventEmitted = true;
            });

            await supplyChain.buyPalette(upc, { from: distributorID, value: productPrice });

            const resultCoffeeSupplyChain = await supplyChain.fetchProduct.call(upc);
            assert.equal(Number(resultCoffeeSupplyChain[2]), itemState + 4, 'Error: Invalid item state');
            assert.equal(resultCoffeeSupplyChain[3], distributorID, 'Error: Missing or Invalid ownerID');
            assert.equal(resultCoffeeSupplyChain[3], distributorID, 'Error: Missing or Invalid distributorID');
            assert.equal(eventEmitted, true, 'Invalid event emitted');
        });

        it('should correctly run shipPalette()', async () => {
            const supplyChain = await SupplyChain.deployed(originFarmerID, distributorID, retailerID);

            let eventEmitted = false;

            await supplyChain.Shipped(() => {
                eventEmitted = true;
            });

            await supplyChain.shipPalette(upc, { from: distributorID });

            const resultCoffeeSupplyChain = await supplyChain.fetchProduct.call(upc);
            assert.equal(Number(resultCoffeeSupplyChain[2]), itemState + 5, 'Error: Invalid item state');
            assert.equal(eventEmitted, true, 'Invalid event emitted');
        });

        it('should correctly run receivePalette()', async () => {
            const supplyChain = await SupplyChain.deployed(originFarmerID, distributorID, retailerID);
    
            let eventEmitted = false;

            await supplyChain.Received(() => {
                eventEmitted = true;
            });

            await supplyChain.receivePalette(upc, { from: retailerID });

            const resultCoffeeSupplyChain = await supplyChain.fetchProductHistory.call(upc);
            assert.equal(Number(resultCoffeeSupplyChain[5]), itemState + 6, 'Error: Invalid item state');
            assert.equal(resultCoffeeSupplyChain[0], retailerID, 'Error: Missing or Invalid ownerID');
            assert.equal(resultCoffeeSupplyChain[3], retailerID, 'Error: Missing or Invalid retailerID');
            assert.equal(eventEmitted, true, 'Invalid event emitted');
        });

        it('should correctly run initializeSale()', async () => {
            const supplyChain = await SupplyChain.deployed(originFarmerID, distributorID, retailerID);
    
            let eventEmitted = false;

            await supplyChain.SaleInitialized(() => {
                eventEmitted = true;
            });

            await supplyChain.initializeSale(upc, consumerID, { from: retailerID });

            const resultCoffeeSupplyChain = await supplyChain.fetchProductHistory.call(upc);
            assert.equal(Number(resultCoffeeSupplyChain[5]), itemState + 7, 'Error: Invalid item state');
            assert.equal(eventEmitted, true, 'Invalid event emitted');
        });

        it('should correctly run buy()', async () => {
            const supplyChain = await SupplyChain.deployed(originFarmerID, distributorID, retailerID);
    
            let eventEmitted = false;

            await supplyChain.Bought(() => {
                eventEmitted = true;
            });

            await supplyChain.buy(upc, { from: consumerID, value: productPrice });

            const resultCoffeeSupplyChain = await supplyChain.fetchProductHistory.call(upc);
            assert.equal(Number(resultCoffeeSupplyChain[5]), itemState + 8, 'Error: Invalid item state');
            assert.equal(resultCoffeeSupplyChain[0], consumerID, 'Error: Missing or Invalid ownerID');
            assert.equal(resultCoffeeSupplyChain[4], consumerID, 'Error: Missing or Invalid consumerID');
            assert.equal(eventEmitted, true, 'Invalid event emitted');
        });

        it('should correctly run fetchProduct()', async () => {
            const supplyChain = await SupplyChain.deployed(originFarmerID, distributorID, retailerID);
            
            const resultCoffeeSupplyChain = await supplyChain.fetchProduct.call(upc);
            assert.equal(resultCoffeeSupplyChain[0], sku, 'Error: Invalid item SKU');
            assert.equal(resultCoffeeSupplyChain[1], upc, 'Error: Invalid item UPC');
            assert.equal(Number(resultCoffeeSupplyChain[2]), itemState + 8, 'Error: Invalid itemState');
            assert.equal(resultCoffeeSupplyChain[3], consumerID, 'Error: Missing or Invalid ownerID');
            assert.equal(resultCoffeeSupplyChain[4], originFarmerID, 'Error: Missing or Invalid originFarmerID');
            assert.equal(resultCoffeeSupplyChain[5], originFarmName, 'Error: Missing or Invalid originFarmName');
            assert.equal(resultCoffeeSupplyChain[6], originFarmInformation, 'Error: Missing or Invalid originFarmInformation');
            assert.equal(resultCoffeeSupplyChain[7], originFarmLatitude, 'Error: Missing or Invalid originFarmLatitude');
            assert.equal(resultCoffeeSupplyChain[8], originFarmLongitude, 'Error: Missing or Invalid originFarmLongitude');
            assert.equal(resultCoffeeSupplyChain[9], productName, 'Error: Missing or Invalid productName');   
        });

        it('should correctly run fetchProductHistory()', async () => {
            const supplyChain = await SupplyChain.deployed(originFarmerID, distributorID, retailerID);
            
            const resultCoffeeSupplyChain = await supplyChain.fetchProductHistory.call(upc);
            assert.equal(resultCoffeeSupplyChain[0], consumerID, 'Error: Missing or Invalid ownerID');
            assert.equal(resultCoffeeSupplyChain[1], originFarmerID, 'Error: Missing or Invalid originFarmerID');
            assert.equal(resultCoffeeSupplyChain[2], distributorID, 'Error: Missing or Invalid distributorID');
            assert.equal(resultCoffeeSupplyChain[3], retailerID, 'Error: Missing or Invalid retailerID');
            assert.equal(resultCoffeeSupplyChain[4], consumerID, 'Error: Missing or Invalid consumerID');
            assert.equal(Number(resultCoffeeSupplyChain[5]), itemState + 8, 'Error: Invalid itemState');
        });
    });
});

