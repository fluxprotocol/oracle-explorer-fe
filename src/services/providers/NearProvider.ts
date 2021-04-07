import { IProvider } from "./IProvider";
import FluxSdk from '@fluxprotocol/amm-sdk';
import { NEAR_FLUX_TOKEN_ID, NEAR_NETWORK, NEAR_NULL_CONTRACT } from "../../config";

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

    async getAccountInfo() {
        const accountId = this.sdkInstance.getAccountId();
        if (!accountId) throw new Error('getAccountInfo was called before isLoggedIn()');

        const balance = await this.sdkInstance.getTokenBalance(NEAR_FLUX_TOKEN_ID, accountId);

        return {
            accountId,
            balance,
        };
    }
}
