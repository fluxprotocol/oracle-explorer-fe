import { Account } from "../../models/Account";
import { AppConfig } from "../../models/AppConfig";
import { DataRequestViewModel } from "../../models/DataRequest";
import { Outcome } from "../../models/DataRequestOutcome";
import { TokenViewModel } from "../../models/Token";

export interface IProvider {
    id: string;
    nativeTokenSymbol: string;
    nativeTokenDecimals: number;
    init(): Promise<boolean>;
    login(): Promise<boolean>;
    logout(): Promise<boolean>;
    stake(amount: string, dataRequest: DataRequestViewModel, outcome: Outcome): Promise<boolean>;
    unstake(amount: string, round: number, dataRequest: DataRequestViewModel, outcome: Outcome): Promise<boolean>;
    finalize(dataRequest: DataRequestViewModel): Promise<boolean>;
    claim(accountId: string, dataRequest: DataRequestViewModel): Promise<boolean>;
    getAccountInfo(accountId: string): Promise<Omit<Account, 'providerId'>>;
    getLoggedInAccountId(): Promise<string | undefined>;
    isLoggedIn(): Promise<boolean>;
    getStorageBalance(accountId: string): Promise<{ total: string, available: string, used: string }>;
    withdrawStorage(amount: string): Promise<boolean>;
    getTokenInfo(contractId: string): Promise<TokenViewModel | undefined>;
    getAppConfig(): Promise<AppConfig>;
}
