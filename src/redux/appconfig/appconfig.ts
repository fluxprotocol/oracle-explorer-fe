import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppConfig } from '../../models/AppConfig';

export type AppConfigState = Readonly<{
    loading: boolean;
    appConfig: AppConfig;
}>;

const initialState: AppConfigState = {
    loading: false,
    appConfig: {
        nativeTokenDecimals: 18,
        nativeTokenSymbol: '?',
        stakeTokenDecimals: 18,
        stakeTokenSymbol: '?',
    }
};

const appConfigSlice = createSlice({
    initialState,
    name: 'appconfig',
    reducers: {
        setAppConfigLoading(state: AppConfigState, action: PayloadAction<AppConfigState['loading']>): AppConfigState {
            return ({
                ...state,
                loading: action.payload,
            });
        },

        setAppConfig(state: AppConfigState, action: PayloadAction<AppConfigState['appConfig']>): AppConfigState {
            return ({
                ...state,
                appConfig: action.payload,
            });
        },
    },
});

export const {
    setAppConfig,
    setAppConfigLoading,
} = appConfigSlice.actions;

export default appConfigSlice.reducer;
