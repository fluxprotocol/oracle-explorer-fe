import { DEFAULT_PAGINATION_LIMIT } from "../../config";
import { getAccountInfo } from "../../services/AccountService";
import { getAccountAnalytics, getRequestorInvalidRequestsAnalytics, Period } from "../../services/AnalyticsService";
import { getAllDataRequests } from "../../services/DataRequestService";
import { getAccountInfoWithProvider, getLoggedInAccount, loginWithProvider, logoutWithProvider } from "../../services/providers/ProviderRegistry";
import { getUnclaimedStakesByAccountId, getUserStakesByAccountId } from "../../services/UserStakeService";
import { setAccount, setAccountDetail, setAccountInfo, setAccountLoading, setAccountPayoutAnalyticsData, setAccountPayoutAnalyticsLoading, setAccountRequests, setAccountRequestsTotal, setAccountStakes, setAccountStakesTotal, setAccountUnclaimedStakes, setRequestorInvalidAnalyticsData, setRequestorInvalidAnalyticsLoading } from "./account";

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

        const accountInfo = await getAccountInfo(accountId);
        dispatch(setAccountDetail(account));
        dispatch(setAccountInfo(accountInfo));
    };
}


export function loadAccountStakes(page: number, accountId: string) {
    return async (dispatch: Function) => {
        const offset = DEFAULT_PAGINATION_LIMIT * page;
        const stakes = await getUserStakesByAccountId(accountId, {
            limit: DEFAULT_PAGINATION_LIMIT,
            offset,
        });

        dispatch(setAccountStakesTotal(stakes.total));
        dispatch(setAccountStakes(stakes.items));
    }
}

export function loadAccountRequests(page: number, requestor: string) {
    return async (dispatch: Function) => {
        const offset = DEFAULT_PAGINATION_LIMIT * page;
        const requests = await getAllDataRequests({
            limit: DEFAULT_PAGINATION_LIMIT,
            offset,
        }, { requestor, onlyArbitratorRequests: false });

        dispatch(setAccountRequests(requests.items));
        dispatch(setAccountRequestsTotal(requests.total));
    }
}

export function loadUnclaimedAccountStakes(accountId: string) {
    return async (dispatch: Function) => {
        const stakes = await getUnclaimedStakesByAccountId(accountId);
        dispatch(setAccountUnclaimedStakes(stakes));
    }
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

export function loadAccountAnalytics(accountId: string, period: Period) {
    return async (dispatch: Function) => {
        dispatch(setAccountPayoutAnalyticsLoading(true));
        const points = await getAccountAnalytics(accountId, period);

        dispatch(setAccountPayoutAnalyticsData(points));
        dispatch(setAccountPayoutAnalyticsLoading(false));
    }
}

export function loadRequestorInvalidAnalytics(accountId: string, period: Period) {
    return async (dispatch: Function) => {
        dispatch(setRequestorInvalidAnalyticsLoading(true));
        const points = await getRequestorInvalidRequestsAnalytics(accountId, period);

        dispatch(setRequestorInvalidAnalyticsData(points));
        dispatch(setRequestorInvalidAnalyticsLoading(false));
    }
}
