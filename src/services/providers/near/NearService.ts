import { WalletConnection, utils, transactions } from "near-api-js";
import BN from 'bn.js';
import { NEAR_FLUX_TOKEN_ID, NEAR_ORACLE_CONTRACT_ID } from "../../../config";
import Big from "big.js";
import cache from "../../../utils/cache";

export interface TransactionViewOptions {
    methodName: string;
    args?: object;
}

export interface TransactionCallOptions extends TransactionViewOptions {
    gas: string;
    amount: string;
}

export interface TransactionOption {
    receiverId: string;
    transactionOptions: TransactionCallOptions[];
}

export async function batchSendTransactions(walletConnection: WalletConnection, txs: TransactionOption[], callbackUrl?: string) {
    const accountId = walletConnection.getAccountId();
    const localKey = await walletConnection._near.connection.signer.getPublicKey(accountId, walletConnection._near.connection.networkId);
    const block = await walletConnection._near.connection.provider.block({ finality: 'final' });
    const blockHash = utils.serialize.base_decode(block.header.hash);

    const resultTxs = await Promise.all(txs.map(async ({ receiverId, transactionOptions }, index) => {
        const actions = transactionOptions.map(tx => transactions.functionCall(tx.methodName, tx.args ?? {}, new BN(tx.gas), new BN(tx.amount)));
        const accessKey = await walletConnection.account().accessKeyForTransaction(receiverId, actions, localKey);

        if (!accessKey) {
            throw new Error(`Cannot find matching key for transaction sent to ${receiverId}`);
        }

        const publicKey = utils.PublicKey.from(accessKey.public_key);
        const nonce = accessKey.access_key.nonce + index + 1;

        return transactions.createTransaction(accountId, publicKey, receiverId, nonce, actions, blockHash);
    }));

    return walletConnection.requestSignTransactions(resultTxs, callbackUrl);
}

export async function getTokenBalance(walletConnection: WalletConnection, accountId: string): Promise<string> {
    const account = walletConnection.account();
    return account.viewFunction(NEAR_FLUX_TOKEN_ID, 'ft_balance_of', {
        account_id: accountId,
    });
}

/**
 * Gets the minimum amount storage required for a oracle transaction
 *
 * @export
 * @param {WalletConnection} walletConnection
 * @return {Promise<Big>}
 */
export async function getMinimumStorage(walletConnection: WalletConnection): Promise<Big> {
    return cache(`${NEAR_ORACLE_CONTRACT_ID}_minimum_storage_balance`, async () => {
        const account = walletConnection.account();
        const minimumBalance = await account.viewFunction(NEAR_ORACLE_CONTRACT_ID, 'storage_minimum_balance', {});
        return Big(minimumBalance);
    });
}

export async function getStorageBalance(walletConnection: WalletConnection): Promise<{ total: Big, available: Big }> {
    try {
        const account = walletConnection.account();
        const storage = await account.viewFunction(NEAR_ORACLE_CONTRACT_ID, 'storage_balance_of', {
            account_id: account.accountId,
        });

        return {
            total: new Big(storage.total),
            available: new Big(storage.available),
        };
    } catch (error) {
        console.error('[getStorageBalance]', error);
        return {
            total: new Big(0),
            available: new Big(0),
        };
    }
}
