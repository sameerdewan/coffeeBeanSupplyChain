const HDWalletProvider = require('@truffle/hdwallet-provider');
const infuraKey = process.env.INFURAKEY || 'https://rinkeby.infura.io/v3/630e59119f164d1384e3ac076ccf979b';
const mnemonic = process.env.MNEMONIC || 'spirit supply whale amount human item harsh scare congress discover talent hamster';


module.exports = {
    networks: {
        development: {
            host: '127.0.0.1',
            port: process.env.PORT || 8545,
            network_id: '*'
        },
        rinkeby: {
            provider: () => new HDWalletProvider(mnemonic, infuraKey),
            network_id: 4,
            gas: 4500000,
            gasPrice: 10000000000,
            type: 'quorum'
        }
    },
    compilers: {
        solc: {
            version: '^0.6.0'
        }
    }
};