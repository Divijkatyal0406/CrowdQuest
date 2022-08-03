const CrowdSource = artifacts.require("CrowdSource");
const Authentication = artifacts.require("Authentication");

module.exports = function(deployer) {
  deployer.deploy(CrowdSource);
  deployer.deploy(Authentication);
};