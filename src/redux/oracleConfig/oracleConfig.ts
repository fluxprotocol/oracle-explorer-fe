import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OracleConfig } from '../../models/OracleConfig';

export type OracleConfigState = Readonly<{
    detail?: OracleConfig;
    loading: boolean;
}>;

const initialState: OracleConfigState = {
    loading: false,
};

const oracleConfigSlice = createSlice({
    initialState,
    name: 'oracleConfig',
    reducers: {
        setOracleConfigDetail(state: OracleConfigState, action: PayloadAction<OracleConfig | undefined>): OracleConfigState {
            return ({
                ...state,
                detail: action.payload,
            });
        },

        setOracleConfigLoading(state: OracleConfigState, action: PayloadAction<boolean>): OracleConfigState {
            return ({
                ...state,
                loading: action.payload,
            });
        },
    },
});

export const {
    setOracleConfigDetail,
    setOracleConfigLoading,
} = oracleConfigSlice.actions;

export default oracleConfigSlice.reducer;
