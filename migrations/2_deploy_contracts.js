const CrowdSource = artifacts.require("CrowdSource");

module.exports = function(deployer) {
  deployer.deploy(CrowdSource);
};