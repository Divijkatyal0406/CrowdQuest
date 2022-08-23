/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 */
 const HDWalletProvider = require("@truffle/hdwallet-provider")
 require('dotenv').config();

 module.exports = {
  networks: {
    development: {
    host: "127.0.0.1",    // Localhost (default: none)
    port: 8545,            // Standard Ethereum port (default: none)
     network_id: "*",       // Any network (default: none)
    },
    matic: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, 
        `wss://rpc-mumbai.maticvigil.com/ws/v1/1d36b38d8b578851d36c86daa52df8c6d16256bd`),
        network_id: 80001,
        confirmations: 2,
        timeoutBlocks: 200,
        skipDryRun: true,
        gas: 6000000,
        gasPrice: 20000000000,
    },
  },

  contracts_directory: 'contracts/',
  contracts_build_directory: './src/abis/',

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.5.1",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled: false to enabled: true
  // Note: if you migrated your contracts prior to enabling this field in your Truffle project and want
  // those previously migrated contracts available in the .db directory, you will need to run the following:
  // $ truffle migrate --reset --compile-all

  db: {
    enabled: false
  }
};
