import { WalletConnection, utils, transactions } from "near-api-js";
import BN from 'bn.js';
import { NEAR_ORACLE_CONTRACT_ID } from "../../../config";
import { Outcome, OutcomeType } from "../../../models/DataRequestOutcome";
import { DataRequestViewModel } from "../../../models/DataRequest";
import Big from "big.js";
import { OracleConfigGraphData } from "../../../models/OracleConfig";
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

export async function getLatestOracleConfig(walletConnection: WalletConnection): Promise<OracleConfigGraphData> {
    const account = walletConnection.account();

    return cache('near_latest_oracle_config', async () => {
        return account.viewFunction(NEAR_ORACLE_CONTRACT_ID, 'get_config', {});
    });
}

export async function getTokenBalance(walletConnection: WalletConnection, accountId: string): Promise<string> {
    const account = walletConnection.account();
    const config = await getLatestOracleConfig(walletConnection);

    return account.viewFunction(config.stake_token, 'ft_balance_of', {
        account_id: accountId,
    });
}

export function createNearOutcome(dataRequest: DataRequestViewModel, outcome: Outcome): any {
    if (outcome.type === OutcomeType.Invalid) {
        return 'Invalid';
    }

    if (dataRequest.data_type === 'String') {
        return {
            'Answer': {
                'String': outcome.answer,
            }
        }
    }

    let number = new Big(outcome.answer);
    const isNegative = number.lt(0);

    number = number.mul(dataRequest.number_multiplier!);

    // Convert back to positive to store inside a u128
    if (isNegative) {
        number = number.mul(-1);
    }

    return {
        'Answer': {
            'Number': {
                value: number.toFixed(0),
                negative: isNegative,
                multiplier: dataRequest.number_multiplier,
            }
        }
    }
}
