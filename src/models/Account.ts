export interface AccountInfo {
    activeStaking: string;
    totalStaked: string;
    totalClaimed: string;
}

export interface Account {
    accountId: string;
    balance: string;
    providerId: string;
}
