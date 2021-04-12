import { IProvider } from "./IProvider";
import FluxSdk from '@fluxprotocol/amm-sdk';
import { NEAR_FLUX_TOKEN_ID, NEAR_MAX_GAS, NEAR_NETWORK, NEAR_NULL_CONTRACT, NEAR_ORACLE_CONTRACT_ID, STORAGE_BASE } from "../../config";
import { Outcome, OutcomeType } from "../../models/DataRequestOutcome";
import { DataRequestViewModel } from "../../models/DataRequest";

export default class NearProvider implements IProvider {
    id = 'near';

    sdkInstance = new FluxSdk({
        network: NEAR_NETWORK,
        nullContractId: NEAR_NULL_CONTRACT,
    });

    async init() {
        await this.sdkInstance.connect();
        return true;
    }

    async login() {
        this.sdkInstance.signIn();
        return true;
    }

    async logout() {
        this.sdkInstance.signOut();
        return true;
    }

    isLoggedIn() {
        return this.sdkInstance.isSignedIn();
    }

    getLoggedInAccountId() {
        return this.sdkInstance.getAccountId();
    }

    async getAccountInfo() {
        const accountId = this.sdkInstance.getAccountId();
        if (!accountId) throw new Error('getAccountInfo was called before isLoggedIn()');

        const balance = await this.sdkInstance.getTokenBalance(NEAR_FLUX_TOKEN_ID, accountId);

        return {
            accountId,
            balance,
        };
    }

    async stake(amount: string, dataRequest: DataRequestViewModel, outcome: Outcome) {
        const account = this.sdkInstance.walletConnection?.account();
        if (!account) return false;

        // Formatting is weird in rust..
        const stakeOutcome = outcome.type === OutcomeType.Invalid ? 'Invalid' : { 'Answer': outcome.answer };

        await account.functionCall(NEAR_ORACLE_CONTRACT_ID, 'transfer_call_stake', {
            receiver_id: NEAR_ORACLE_CONTRACT_ID,
            amount,
            msg: JSON.stringify({
                'StakeDataRequest': {
                    id: dataRequest.id,
                    outcome: stakeOutcome,
                }
            }),
            // @ts-ignore
        }, NEAR_MAX_GAS);

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
