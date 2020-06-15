const FarmerRole = artifacts.require('../contracts/coffeeaccesscontrol/FarmerRole.sol');
const DistributorRole = artifacts.require('../contracts/coffeeaccesscontrol/DistributorRole.sol');
const RetailerRole = artifacts.require('../contracts/coffeeaccesscontrol/RetailerRole.sol');
const ConsumerRole = artifacts.require('../contracts/coffeeaccesscontrol/ConsumerRole.sol');
const SupplyChain = artifacts.require('../contracts/coffeebase/SupplyChain.sol');


module.exports = function(deployer) {
  deployer.deploy(FarmerRole);
  deployer.deploy(DistributorRole);
  deployer.deploy(RetailerRole);
  deployer.deploy(ConsumerRole);
  deployer.deploy(SupplyChain);
};
