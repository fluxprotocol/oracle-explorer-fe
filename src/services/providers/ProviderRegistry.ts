import { Account } from "../../models/Account";
import { DataRequestViewModel } from "../../models/DataRequest";
import { Outcome } from "../../models/DataRequestOutcome";
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

export function getLoggedInProvider() {
    return providers.find(p => p.isLoggedIn());
}

export async function loginWithProvider(providerId: string) {
    const provider = getProviderById(providerId);
    return provider?.login() ?? false;
}

export async function logoutWithProvider(providerId: string) {
    const provider = getProviderById(providerId);
    return provider?.logout() ?? false;
}

export function getLoggedInAccountId(): string | undefined {
    const provider = getLoggedInProvider();
    return provider ? provider.getLoggedInAccountId() : undefined;
}

export async function getAccountInfoWithProvider(providerId: string, accountId: string): Promise<Account | undefined> {
    const provider = getProviderById(providerId);
    const account = await provider?.getAccountInfo(accountId);
    if (!account || !provider) return undefined;

    return {
        accountId: account.accountId,
        balance: account.balance,
        providerId: provider.id,
    };
}

export async function getLoggedInAccount(): Promise<Account | undefined> {
    const provider = getLoggedInProvider();

    if (!provider) {
        return undefined;
    }

    const loggedInAccountId = provider.getLoggedInAccountId();

    if (!loggedInAccountId) {
        return undefined;
    }

    return getAccountInfoWithProvider(provider.id, loggedInAccountId);
}

export async function stakeWithProvider(providerId: string, amount: string, dataRequest: DataRequestViewModel, outcome: Outcome): Promise<boolean> {
    const provider = getProviderById(providerId);
    return provider?.stake(amount, dataRequest, outcome) ?? false;
}

export async function finalizeWithProvider(providerId: string, dataRequest: DataRequestViewModel): Promise<boolean> {
    const provider = getProviderById(providerId);
    return provider?.finalize(dataRequest) ?? false;
}

export async function claimWithProvider(providerId: string, accountId: string, dataRequest: DataRequestViewModel): Promise<boolean> {
    const provider = getProviderById(providerId);
    return provider?.claim(accountId, dataRequest) ?? false;
}
