import { Account } from "../../models/Account";
import { DataRequestViewModel } from "../../models/DataRequest";
import { Outcome } from "../../models/DataRequestOutcome";

export interface IProvider {
    id: string;
    init(): Promise<boolean>;
    login(): Promise<boolean>;
    logout(): Promise<boolean>;
    stake(amount: string, dataRequest: DataRequestViewModel, outcome: Outcome): Promise<boolean>;
    finalize(dataRequest: DataRequestViewModel): Promise<boolean>;
    claim(accountId: string, dataRequest: DataRequestViewModel): Promise<boolean>;
    getAccountInfo(): Promise<Omit<Account, 'providerId'>>;
    getLoggedInAccountId(): string | undefined;
    isLoggedIn(): boolean;
}
