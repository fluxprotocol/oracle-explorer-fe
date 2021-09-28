import { IProvider } from "../IProvider";
import { NEAR_MAX_GAS, NEAR_NULL_CONTRACT, NEAR_ORACLE_CONTRACT_ID, STORAGE_BASE } from "../../../config";
import { isSameOutcome, Outcome } from "../../../models/DataRequestOutcome";
import { DataRequestViewModel } from "../../../models/DataRequest";
import Big from "big.js";
import { batchSendTransactions, createNearOutcome, getLatestOracleConfig, getTokenBalance, TransactionOption } from "./NearService";
import { connectWallet } from "./NearConnectService";
import { createStorageTransaction } from "./StorageManagerService";
import { Account } from "../../../models/Account";
import { TokenViewModel } from "../../../models/Token";
import { AppConfig } from "../../../models/AppConfig";

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

        const stakeOutcome = createNearOutcome(dataRequest, outcome);
        const loggedInAccount = await this.getLoggedInAccountId();
        const storageTransaction = await createStorageTransaction(NEAR_ORACLE_CONTRACT_ID, loggedInAccount, wallet);
        const transactions: TransactionOption[] = [];

        if (storageTransaction) {
            transactions.push(storageTransaction);
        }

        transactions.push({
            receiverId: dataRequest.config.stakeToken.contractId,
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

        const stakeOutcome = createNearOutcome(dataRequest, outcome);

        await account.functionCall(NEAR_ORACLE_CONTRACT_ID, 'dr_unstake', {
            request_id: dataRequest.id,
            resolution_round: round,
            outcome: stakeOutcome,
            amount,

            // @ts-ignore
        }, NEAR_MAX_GAS, '1');

        return true;
    }

    async finalize(dataRequest: DataRequestViewModel) {
        const wallet = await connectWallet();
        const account = wallet.account();
        if (!account) return false;

        const transactions: TransactionOption[] = [];

        transactions.push({
            receiverId: NEAR_ORACLE_CONTRACT_ID,
            transactionOptions: [{
                amount: '0',
                gas: NEAR_MAX_GAS,
                methodName: 'dr_finalize',
                args: {
                    request_id: dataRequest.id,
                }
            }],
        });

        await batchSendTransactions(wallet, transactions);

        return true;
    }

    async claim(accountId: string, dataRequest: DataRequestViewModel) {
        const wallet = await connectWallet();
        const account = wallet.account();
        if (!account) return false;

        const oracleTransaction: TransactionOption = {
            receiverId: NEAR_ORACLE_CONTRACT_ID,
            transactionOptions: [],
        };

        const unbondedStakes = dataRequest.loggedInAccountStakes.filter(stake => !stake.bonded && new Big(stake.totalStake).gt(0));
        const halfGas = new Big(NEAR_MAX_GAS).div(2).round(0, 0);

        // Claim back any unbonded stake
        if (unbondedStakes.length) {
            oracleTransaction.transactionOptions = unbondedStakes.map(stake => {
                const outcome = createNearOutcome(dataRequest, stake.outcome);

                return {
                    amount: '1',
                    gas: halfGas.div(unbondedStakes.length).round(0, 0).toString(),
                    methodName: 'dr_unstake',
                    args: {
                        request_id: stake.dataRequestId,
                        resolution_round: stake.round,
                        outcome,
                        amount: stake.totalStake.toString(),
                    },
                }
            });
        }

        // Only claim if we actually have something to claim otherwise this would just cost gas
        const canClaim = dataRequest.loggedInAccountStakes.some(stake => isSameOutcome(stake.outcome, dataRequest.finalized_outcome));

        if (canClaim) {
            oracleTransaction.transactionOptions.push({
                amount: STORAGE_BASE,
                gas: halfGas.toString(),
                methodName: 'dr_claim',
                args: {
                    request_id: dataRequest.id,
                    account_id: accountId,
                },
            });
        }

        await batchSendTransactions(wallet, [oracleTransaction]);

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

    async getTokenInfo(contractId: string): Promise<TokenViewModel | undefined> {
        try {
            const wallet = await connectWallet();
            const account = wallet.account();
            const result = await account.viewFunction(contractId, 'ft_metadata', {});

            return result;
        } catch (error) {
            console.error('[NearProvider-getTokenInfo]', error);
            return undefined;
        }
    }

    async getAppConfig(): Promise<AppConfig> {
        const wallet = await connectWallet();
        const config = await getLatestOracleConfig(wallet);
        const stakeToken = await this.getTokenInfo(config.stake_token);
        const bondToken = await this.getTokenInfo(config.payment_token);

        return {
            nativeTokenDecimals: this.nativeTokenDecimals,
            nativeTokenSymbol: this.nativeTokenSymbol,
            stakeTokenDecimals: stakeToken?.decimals ?? 18,
            stakeTokenSymbol: stakeToken?.symbol ?? config.stake_token,
            bondTokenDecimals: bondToken?.decimals ?? 18,
            bondTokenSymbol: bondToken?.symbol ?? config.payment_token,
        };
    }
}
