import { IProvider } from "../IProvider";
import { NEAR_FLUX_TOKEN_ID, NEAR_MAX_GAS, NEAR_NULL_CONTRACT, NEAR_ORACLE_CONTRACT_ID, STORAGE_BASE } from "../../../config";
import { Outcome, OutcomeType } from "../../../models/DataRequestOutcome";
import { DataRequestViewModel } from "../../../models/DataRequest";
import Big from "big.js";
import { batchSendTransactions, createNearOutcome, getTokenBalance, TransactionOption } from "./NearService";
import { connectWallet } from "./NearConnectService";
import { createStorageTransaction } from "./StorageManagerService";
import { Account } from "../../../models/Account";
export default class NearProvider implements IProvider {
    id = 'near';
    nativeTokenSymbol = 'NEAR';
    nativeTokenDecimals = 24;

    async init() {
        return true;
    }

    async login() {
        const wallet = await connectWallet();
        wallet.requestSignIn(NEAR_NULL_CONTRACT, 'oracle');
        return true;
    }

    async logout() {
        const wallet = await connectWallet();
        wallet.signOut();
        return true;
    }

    async isLoggedIn() {
        const wallet = await connectWallet();
        return wallet.isSignedIn();
    }

    async getLoggedInAccountId(): Promise<string> {
        const wallet = await connectWallet();
        return wallet.getAccountId();
    }

    async getAccountInfo(accountId: string): Promise<Omit<Account, 'providerId'>> {
        try {
            const wallet = await connectWallet();
            const balance = await getTokenBalance(wallet, accountId);
            const storageInfo = await this.getStorageBalance(accountId);

            return {
                accountId,
                balance,
                storageAvailable: storageInfo.available,
                storageTotal: storageInfo.total,
                storageUsed: storageInfo.used,
            };
        } catch (error) {
            return {
                accountId,
                balance: '0',
                storageAvailable: '0',
                storageTotal: '0',
                storageUsed: '0',
            }
        }
    }

    async stake(amount: string, dataRequest: DataRequestViewModel, outcome: Outcome) {
        const wallet = await connectWallet();

        const stakeOutcome = outcome.type === OutcomeType.Invalid ? createNearOutcome(dataRequest, outcome.type, '') : createNearOutcome(dataRequest, outcome.type, outcome.answer);
        const loggedInAccount = await this.getLoggedInAccountId();
        const storageTransaction = await createStorageTransaction(NEAR_ORACLE_CONTRACT_ID, loggedInAccount, wallet);
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

        await batchSendTransactions(wallet, transactions);

        return true;
    }

    async unstake(amount: string, round: number, dataRequest: DataRequestViewModel, outcome: Outcome): Promise<boolean> {
        const wallet = await connectWallet();
        const account = wallet.account();
        if (!account) return false;

        const stakeOutcome = outcome.type === OutcomeType.Invalid ? createNearOutcome(dataRequest, outcome.type, '') : createNearOutcome(dataRequest, outcome.type, outcome.answer);

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
        const wallet = await connectWallet();
        const account = wallet.account();
        if (!account) return false;

        await account.functionCall(NEAR_ORACLE_CONTRACT_ID, 'dr_finalize', {
            request_id: dataRequest.id,
            // @ts-ignore
        }, NEAR_MAX_GAS, STORAGE_BASE);

        return true;
    }

    async claim(accountId: string, dataRequest: DataRequestViewModel) {
        const wallet = await connectWallet();
        const account = wallet.account();
        if (!account) return false;

        await account.functionCall(NEAR_ORACLE_CONTRACT_ID, 'dr_claim', {
            request_id: dataRequest.id,
            account_id: accountId,
            // @ts-ignore
        }, NEAR_MAX_GAS, STORAGE_BASE);

        return true;
    }

    async getStorageBalance(accountId: string): Promise<{ total: string, available: string, used: string }> {
        try {
            const wallet = await connectWallet();
            const account = wallet.account();
            if (!account) {
                return {
                    total: '0',
                    available: '0',
                    used: '0',
                };
            }

            const storageBalance = await account.viewFunction(NEAR_ORACLE_CONTRACT_ID, 'storage_balance_of', {
                account_id: accountId,
            });

            const used = new Big(storageBalance.total).sub(storageBalance.available);

            return {
                total: storageBalance.total,
                available: storageBalance.available,
                used: used.toString(),
            }
        } catch (error) {
            console.error('[getStorageBalance -> NEAR]', error);
            return {
                total: '0',
                available: '0',
                used: '0',
            }
        }
    }

    async withdrawStorage(amount: string): Promise<boolean> {
        const wallet = await connectWallet();
        const account = wallet.account();

        await account.functionCall(NEAR_ORACLE_CONTRACT_ID, 'storage_withdraw', {
            amount,
            // @ts-ignore
        }, NEAR_MAX_GAS, '1');

        return true;
    }
}
