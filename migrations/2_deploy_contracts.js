var Tax = artifacts.require("./Tax.sol")

module.exports = function (deployer) {
  deployer.deploy(Tax, "0x73A0d6CE26555d09135eE1D6a02EE3385811B4Ed");
};
