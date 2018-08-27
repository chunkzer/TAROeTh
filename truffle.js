var HDWalletProvider = require("truffle-hdwallet-provider");

// Insert mnemonic here
let mnemonic = "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat"
var infura_apikey = "HTh3kxlPnMM977WvODPY";

module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+ infura_apikey),
      network_id: 3,
      gas: 4600036,
      gasPrice: 3100000000
    },
    live: {
      provider: new HDWalletProvider(mnemonic, "https://mainnet.infura.io/"+ infura_apikey),
      network_id: 1,
      host: "localhost",
      gas: 6300036,
      gasPrice: 3100000000
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 500
    }
  }
};
