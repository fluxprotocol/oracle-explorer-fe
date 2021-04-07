import { Account } from "../../models/Account";
import { IProvider } from "./IProvider";
import NearProvider from "./NearProvider";

let providers: IProvider[] = [];
let providerInitPromise: Promise<boolean[]>;

export async function initProviders() {
    if (providerInitPromise) {
        await providerInitPromise;
        return;
    }

    providers = [
        new NearProvider(),
    ];

    providerInitPromise = Promise.all(providers.map(p => p.init()));
    await providerInitPromise;
}

export function getProviderById(id: string): IProvider | undefined {
    return providers.find(p => p.id === id);
}

export async function loginWithProvider(providerId: string) {
    const provider = getProviderById(providerId);
    return provider?.login() ?? false;
}

export async function logoutWithProvider(providerId: string) {
    const provider = getProviderById(providerId);
    return provider?.logout() ?? false;
}

export async function getLoggedInAccount(): Promise<Account | undefined> {
    const provider = providers.find(p => p.isLoggedIn());

    if (!provider) {
        return undefined;
    }

    const accountInfo = await provider.getAccountInfo();

    return {
        providerId: provider.id,
        accountId: accountInfo.accountId,
        balance: accountInfo.balance,
    };
}
