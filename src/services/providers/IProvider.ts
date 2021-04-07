import { Account } from "../../models/Account";

export interface IProvider {
    id: string;
    init(): Promise<boolean>;
    login(): Promise<boolean>;
    logout(): Promise<boolean>;
    getAccountInfo(): Promise<Omit<Account, 'providerId'>>;
    isLoggedIn(): boolean;
}
