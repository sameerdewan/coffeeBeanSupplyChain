const HDWalletProvider = require('@truffle/hdwallet-provider');
const infuraKey = process.env.INFURAKEY;
const mnemonic = process.env.LOCAL_MNEMONIC || process.env.REMOTE_MNEMONIC;


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