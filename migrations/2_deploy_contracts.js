var TaroEth = artifacts.require("./TaroEth.sol")

module.exports = function(deployer) {
  deployer.deploy(TaroEth);
};
