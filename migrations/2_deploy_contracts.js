const SupplyChain = artifacts.require('../contracts/coffeebase/SupplyChain.sol');


module.exports = function(deployer) {
  deployer.deploy(SupplyChain);
};
