const SupplyChain = artifacts.require('../contracts/SupplyChain.sol');


module.exports = function(deployer, _, accounts) {
  deployer.deploy(SupplyChain, accounts[1], accounts[2], accounts[3]);
};
