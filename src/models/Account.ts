import { WhitelistItemViewModel } from "./WhitelistItem";

export interface AccountInfo {
    activeStaking: string;
    totalStaked: string;
    totalClaimed: string;
    storageAvailable: string;
    storageTotal: string;
    storageUsed: string;
    hasStakes: boolean;
    hasRequests: boolean;
    whitelistItem?: WhitelistItemViewModel;
}

export interface Account {
    accountId: string;
    balance: string;
    providerId: string;
    storageAvailable: string;
    storageTotal: string;
    storageUsed: string;
}
