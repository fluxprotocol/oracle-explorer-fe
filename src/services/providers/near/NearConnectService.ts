import { connect, Near, WalletConnection, keyStores } from "near-api-js";
import { NEAR_NETWORK } from "../../../config";

export interface ConnectConfig {
    accountId?: string;
    nearInstance?: Near;
    walletInstance?: WalletConnection;
    customNodeUrl?: string;
    customWalletUrl?: string;
}

export interface NetworkConfig {
    networkId: string,
    nodeUrl: string,
    contractName?: null,
    walletUrl?: string,
    initialBalance?: string
}

export function createNetworkConfig(connectConfig: ConnectConfig): NetworkConfig {
    if (NEAR_NETWORK === 'mainnet') {
        return {
            networkId: 'mainnet',
            nodeUrl: 'https://rpc.mainnet.near.org',
            walletUrl: 'https://wallet.near.org',
        };
    }

    return {
        networkId: 'testnet',
        nodeUrl: connectConfig.customNodeUrl || 'https://rpc.testnet.near.org',
        contractName: null,
        walletUrl: connectConfig.customWalletUrl || 'https://wallet.testnet.near.org',
        initialBalance: '100000000',
    };
}

/**
 * Connects with NEAR
 *
 * @export
 * @param {ConnectConfig} connectConfig
 * @param {SdkConfig} sdkConfig
 * @return {Promise<Near>}
 */
export async function connectNear(connectConfig: ConnectConfig): Promise<Near> {
    if (connectConfig.nearInstance) {
        return connectConfig.nearInstance;
    }

    const networkConfig = createNetworkConfig(connectConfig);

    return connect({
        ...networkConfig,
        deps: {
            keyStore: new keyStores.BrowserLocalStorageKeyStore(),
        },
    });
}
