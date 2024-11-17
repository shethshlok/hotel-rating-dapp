/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

module.exports = {
   solidity: "0.8.11",
   networks: {
      hardhat: {},
      sepolia: {
         url: "https://sepolia.infura.io/v3/0e97426476874e84984c1e95db0f5b62",
         accounts: [`0x${process.env.PRIVATE_KEY}`],
         gas: 2100000,
         gasPrice: 3000000000
      }
   },
}