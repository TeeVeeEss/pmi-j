import {  Wallet, CoinType, WalletOptions } from '@iota/sdk';

const walletOptions: WalletOptions = {
    storagePath: `Alice`, // A name to associate with the created account.
    clientOptions: {
        nodes: ['https://api.testnet.shimmer.network'], // The node to connect to.
    },
    coinType: CoinType.Shimmer,
    secretManager: {
        // Setup Stronghold secret manager
        stronghold: {
            snapshotPath: 'vault.stronghold', //  The path to store the account snapshot.
            password: 'a-secure-password', // A password to encrypt the stored data. WARNING: Never hardcode passwords in production code.
        },
    },
};
const wallet = new Wallet(walletOptions);