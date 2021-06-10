export interface AccountInfo {
    activeStaking: string;
    totalStaked: string;
    totalClaimed: string;
    storageAvailable: string;
    storageTotal: string;
    storageUsed: string;
}

export interface Account {
    accountId: string;
    balance: string;
    providerId: string;
    storageAvailable: string;
    storageTotal: string;
    storageUsed: string;
}
