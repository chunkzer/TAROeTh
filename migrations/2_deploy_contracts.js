var TaroEth = artifacts.require("./TaroEth.sol")

module.exports = function(deployer) {
  deployer.deploy(TaroEth, {gas: 6300036, gasPrice: 3100000000});
};
