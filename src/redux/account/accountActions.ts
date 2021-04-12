import { getAccountInfoWithProvider, getLoggedInAccount, loginWithProvider, logoutWithProvider } from "../../services/providers/ProviderRegistry";
import { setAccount, setAccountDetail, setAccountLoading } from "./account";

export function loadLoggedInAccount() {
    return async (dispatch: Function) => {
        const account = await getLoggedInAccount();
        if (!account) return;

        dispatch(setAccount(account));
    };
}

export function loadAccount(providerId: string, accountId: string) {
    return async (dispatch: Function) => {
        const account = await getAccountInfoWithProvider(providerId, accountId);

        if (!account) {
            return;
        }

        dispatch(setAccountDetail({
            account,
        }));
    };
}

export function loginAccount() {
    return async (dispatch: Function) => {
        dispatch(setAccountLoading(true));

        await loginWithProvider('near');

        dispatch(setAccountLoading(false));
    };
}


export function logoutAccount() {
    return async (dispatch: Function) => {
        await logoutWithProvider('near');
        dispatch(setAccount(undefined));
    };
}
