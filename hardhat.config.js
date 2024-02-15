/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");

const METAMASK_PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY;
module.exports = {
  solidity: "0.8.9",
  networks: {
    sepolia: {
      url: `https://arb-sepolia.g.alchemy.com/v2/y0VPnjrxEU0kqbbQauX2SyqUZFLacdas`,
      accounts: [METAMASK_PRIVATE_KEY],
    },
  },
};
