import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Account, AccountInfo } from '../../models/Account';
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
            storageAvailable: '0',
            storageTotal: '0',
            storageUsed: '0',
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
} = accountSlice.actions;

export default accountSlice.reducer;
