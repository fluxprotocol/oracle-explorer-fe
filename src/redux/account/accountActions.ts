import { getLoggedInAccount, loginWithProvider, logoutWithProvider } from "../../services/providers/ProviderRegistry";
import { setAccount, setAccountLoading } from "./account";

export function loadAccount() {
    return async (dispatch: Function) => {
        const account = await getLoggedInAccount();
        if (!account) return;

        dispatch(setAccount(account));
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
