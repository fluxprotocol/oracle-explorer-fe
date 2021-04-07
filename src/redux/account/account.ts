import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Account } from '../../models/Account';

export type AccountState = Readonly<{
    account?: Account;
    error?: string[];
    loading: boolean;
}>;

const initialState: AccountState = {
    loading: false,
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
    },
});

export const {
    setAccount,
    setAccountErrors,
    setAccountLoading,
} = accountSlice.actions;

export default accountSlice.reducer;
