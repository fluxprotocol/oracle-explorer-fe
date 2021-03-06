import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Account, AccountInfo } from '../../models/Account';
import { AnalyticsPoint } from '../../models/AnalyticsPoint';
import { DataRequestListItem } from '../../models/DataRequest';
import { OutcomeStake } from '../../models/OutcomeStake';

export type AccountState = Readonly<{
    account?: Account;
    accountDetail: {
        account?: Account;
        info: AccountInfo;
        unclaimedStakes: OutcomeStake[];

        accountRequests: DataRequestListItem[];
        accountRequestsTotal: number;

        payoutAnalytics: {
            data: AnalyticsPoint[];
            loading: boolean;
        }

        invalidRequestsAnalytics: {
            data: AnalyticsPoint[];
            loading: boolean;
        }

        accountStakes: OutcomeStake[];
        accountStakesTotal: number;
    };
    error?: string[];
    loading: boolean;
}>;

const initialState: AccountState = {
    loading: false,
    accountDetail: {
        account: undefined,
        info: {
            activeStaking: '0',
            totalStaked: '0',
            totalClaimed: '0',
            totalDisputes: '0',
            storageAvailable: '0',
            storageTotal: '0',
            storageUsed: '0',
            timesSlashed: '0',
            totalSlashed: '0',
            hasRequests: false,
            hasStakes: false,
        },
        payoutAnalytics: {
            loading: false,
            data: [],
        },
        invalidRequestsAnalytics: {
            loading: false,
            data: [],
        },
        accountStakes: [],
        accountStakesTotal: 0,
        accountRequests: [],
        accountRequestsTotal: 0,
        unclaimedStakes: [],
    }
};

const accountSlice = createSlice({
    initialState,
    name: 'account',
    reducers: {
        setAccountErrors(state: AccountState, action: PayloadAction<string[]>): AccountState {
            return ({
                ...state,
                error: action.payload,
            });
        },
        setAccountLoading(state: AccountState, action: PayloadAction<boolean>): AccountState {
            return ({
                ...state,
                loading: action.payload,
            });
        },
        setAccount(state: AccountState, action: PayloadAction<Account | undefined>): AccountState {
            return ({
                ...state,
                account: action.payload,
            });
        },
        setAccountDetail(state: AccountState, action: PayloadAction<Account>): AccountState {
            return ({
                ...state,
                accountDetail: {
                    ...state.accountDetail,
                    account: action.payload,
                },
            });
        },
        setAccountStakes(state: AccountState, action: PayloadAction<OutcomeStake[]>): AccountState {
            return ({
                ...state,
                accountDetail: {
                    ...state.accountDetail,
                    accountStakes: action.payload,
                },
            });
        },
        setAccountStakesTotal(state: AccountState, action: PayloadAction<number>): AccountState {
            return ({
                ...state,
                accountDetail: {
                    ...state.accountDetail,
                    accountStakesTotal: action.payload,
                },
            });
        },
        setAccountInfo(state: AccountState, action: PayloadAction<AccountInfo>): AccountState {
            return ({
                ...state,
                accountDetail: {
                    ...state.accountDetail,
                    info: action.payload,
                },
            });
        },
        setAccountUnclaimedStakes(state: AccountState, action: PayloadAction<OutcomeStake[]>): AccountState {
            return ({
                ...state,
                accountDetail: {
                    ...state.accountDetail,
                    unclaimedStakes: action.payload,
                },
            });
        },
        setAccountRequests(state: AccountState, action: PayloadAction<DataRequestListItem[]>): AccountState {
            return ({
                ...state,
                accountDetail: {
                    ...state.accountDetail,
                    accountRequests: action.payload,
                },
            });
        },
        setAccountRequestsTotal(state: AccountState, action: PayloadAction<number>): AccountState {
            return ({
                ...state,
                accountDetail: {
                    ...state.accountDetail,
                    accountRequestsTotal: action.payload,
                },
            });
        },
        setAccountPayoutAnalyticsLoading(state: AccountState, action: PayloadAction<boolean>): AccountState {
            return ({
                ...state,
                accountDetail: {
                    ...state.accountDetail,
                    payoutAnalytics: {
                        ...state.accountDetail.payoutAnalytics,
                        loading: action.payload,
                    },
                },
            });
        },
        setAccountPayoutAnalyticsData(state: AccountState, action: PayloadAction<AnalyticsPoint[]>): AccountState {
            return ({
                ...state,
                accountDetail: {
                    ...state.accountDetail,
                    payoutAnalytics: {
                        ...state.accountDetail.payoutAnalytics,
                        data: action.payload,
                    },
                },
            });
        },
        setRequestorInvalidAnalyticsLoading(state: AccountState, action: PayloadAction<boolean>): AccountState {
            return ({
                ...state,
                accountDetail: {
                    ...state.accountDetail,
                    invalidRequestsAnalytics: {
                        ...state.accountDetail.invalidRequestsAnalytics,
                        loading: action.payload,
                    },
                },
            });
        },
        setRequestorInvalidAnalyticsData(state: AccountState, action: PayloadAction<AnalyticsPoint[]>): AccountState {
            return ({
                ...state,
                accountDetail: {
                    ...state.accountDetail,
                    invalidRequestsAnalytics: {
                        ...state.accountDetail.invalidRequestsAnalytics,
                        data: action.payload,
                    },
                },
            });
        },
    },
});

export const {
    setAccount,
    setAccountErrors,
    setAccountLoading,
    setAccountDetail,
    setAccountStakes,
    setAccountStakesTotal,
    setAccountInfo,
    setAccountUnclaimedStakes,
    setAccountRequests,
    setAccountRequestsTotal,
    setAccountPayoutAnalyticsData,
    setAccountPayoutAnalyticsLoading,
    setRequestorInvalidAnalyticsData,
    setRequestorInvalidAnalyticsLoading,
} = accountSlice.actions;

export default accountSlice.reducer;
