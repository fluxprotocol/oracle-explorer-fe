import { IProvider } from "../IProvider";
import FluxSdk from '@fluxprotocol/amm-sdk';
import { WalletConnection, Near } from 'near-api-js';
import { NEAR_FLUX_TOKEN_ID, NEAR_MAX_GAS, NEAR_NETWORK, NEAR_NULL_CONTRACT, NEAR_ORACLE_CONTRACT_ID, STORAGE_BASE } from "../../../config";
import { Outcome, OutcomeType } from "../../../models/DataRequestOutcome";
import { DataRequestViewModel } from "../../../models/DataRequest";
import Big from "big.js";
import { batchSendTransactions, getTokenBalance, TransactionOption } from "./NearService";
import { connectNear } from "./NearConnectService";
import { createStorageTransaction } from "./StorageManagerService";
export default class NearProvider implements IProvider {
    id = 'near';

    storageDeposit: Big = new Big(0);

    near?: Near;
    walletConnection?: WalletConnection;

    sdkInstance = new FluxSdk({
        network: NEAR_NETWORK,
        nullContractId: NEAR_NULL_CONTRACT,
    });

    async init() {
        this.near = await connectNear({});
        this.walletConnection = new WalletConnection(this.near, NEAR_NULL_CONTRACT);

        return true;
    }

    async login() {
        this.walletConnection?.requestSignIn(NEAR_NULL_CONTRACT, 'oracle');
        return true;
    }

    async logout() {
        this.walletConnection?.signOut();
        return true;
    }

    isLoggedIn() {
        return this.walletConnection?.isSignedIn() ?? false;
    }

    getLoggedInAccountId(): string {
        return this.walletConnection?.getAccountId();
    }

    async getAccountInfo(accountId: string) {
        try {
            if (!this.walletConnection) throw new Error('No wallet connection');
            const balance = await getTokenBalance(this.walletConnection, accountId);

            // TODO: Fetch the storage deposit from the oracle

            return {
                accountId,
                balance,
            };
        } catch (error) {
            return {
                accountId,
                balance: '0',
            }
        }
    }

    async stake(amount: string, dataRequest: DataRequestViewModel, outcome: Outcome) {
        if (!this.walletConnection) return false;

        const stakeOutcome = outcome.type === OutcomeType.Invalid ? 'Invalid' : { 'Answer': outcome.answer };
        const storageTransaction = await createStorageTransaction(NEAR_ORACLE_CONTRACT_ID, this.getLoggedInAccountId(), this.walletConnection);
        const transactions: TransactionOption[] = [];

        if (storageTransaction) {
            transactions.push(storageTransaction);
        }

        transactions.push({
            receiverId: NEAR_FLUX_TOKEN_ID,
            transactionOptions: [{
                amount: '1',
                gas: NEAR_MAX_GAS,
                methodName: 'ft_transfer_call',
                args: {
                    receiver_id: NEAR_ORACLE_CONTRACT_ID,
                    amount,
                    msg: JSON.stringify({
                        'StakeDataRequest': {
                            id: dataRequest.id,
                            outcome: stakeOutcome,
                        }
                    })
                }
            }],
        });

        await batchSendTransactions(this.walletConnection, transactions);

        return true;
    }

    async unstake(amount: string, round: number, dataRequest: DataRequestViewModel, outcome: Outcome): Promise<boolean> {
        const account = this.sdkInstance.walletConnection?.account();
        if (!account) return false;

        // Formatting is weird in rust..
        const stakeOutcome = outcome.type === OutcomeType.Invalid ? 'Invalid' : { 'Answer': outcome.answer };

        await account.functionCall(NEAR_ORACLE_CONTRACT_ID, 'dr_unstake', {
            request_id: dataRequest.id,
            resolution_round: round,
            outcome: stakeOutcome,
            amount,

            // @ts-ignore
        }, NEAR_MAX_GAS, STORAGE_BASE);

        return true;
    }

    async finalize(dataRequest: DataRequestViewModel) {
        const account = this.sdkInstance.walletConnection?.account();
        if (!account) return false;

        await account.functionCall(NEAR_ORACLE_CONTRACT_ID, 'dr_finalize', {
            request_id: dataRequest.id,
            // @ts-ignore
        }, NEAR_MAX_GAS, STORAGE_BASE);

        return true;
    }

    async claim(accountId: string, dataRequest: DataRequestViewModel) {
        const account = this.sdkInstance.walletConnection?.account();
        if (!account) return false;

        await account.functionCall(NEAR_ORACLE_CONTRACT_ID, 'dr_claim', {
            request_id: dataRequest.id,
            account_id: accountId,
            // @ts-ignore
        }, NEAR_MAX_GAS, STORAGE_BASE);

        return true;
    }
}
