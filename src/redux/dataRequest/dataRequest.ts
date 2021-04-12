import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DataRequestListItem, DataRequestViewModel } from '../../models/DataRequest';
import { OutcomeStake } from '../../models/OutcomeStake';

export type DataRequestsState = Readonly<{
    dataRequests: DataRequestListItem[];
    totalDataRequests: number;
    error?: string[];
    detailLoading: boolean;
    loading: boolean;
    dataRequestDetail?: DataRequestViewModel;
    accountStakes: OutcomeStake[];
}>;

const initialState: DataRequestsState = {
    detailLoading: false,
    loading: false,
    dataRequests: [],
    totalDataRequests: 0,
    accountStakes: [],
};

const dataRequestsSlice = createSlice({
    initialState,
    name: 'dataRequests',
    reducers: {
        setDataRequestsErrors(state: DataRequestsState, action: PayloadAction<string[]>): DataRequestsState {
            return ({
                ...state,
                error: action.payload,
            });
        },
        setDataRequestsLoading(state: DataRequestsState, action: PayloadAction<boolean>): DataRequestsState {
            return ({
                ...state,
                loading: action.payload,
            });
        },
        setDataRequestDetailLoading(state: DataRequestsState, action: PayloadAction<boolean>): DataRequestsState {
            return ({
                ...state,
                detailLoading: action.payload,
            });
        },
        setDataRequests(state: DataRequestsState, action: PayloadAction<DataRequestListItem[]>): DataRequestsState {
            return ({
                ...state,
                dataRequests: action.payload,
            });
        },
        setDataRequestDetail(state: DataRequestsState, action: PayloadAction<DataRequestViewModel | undefined>): DataRequestsState {
            return ({
                ...state,
                dataRequestDetail: action.payload,
            });
        },
        setTotalDataRequest(state: DataRequestsState, action: PayloadAction<number>): DataRequestsState {
            return ({
                ...state,
                totalDataRequests: action.payload,
            });
        },
        setDataRequestAccountStakes(state: DataRequestsState, action: PayloadAction<OutcomeStake[]>): DataRequestsState {
            return ({
                ...state,
                accountStakes: action.payload,
            });
        },
    },
});

export const {
    setDataRequests,
    setDataRequestsErrors,
    setDataRequestsLoading,
    setDataRequestDetail,
    setDataRequestDetailLoading,
    setTotalDataRequest,
    setDataRequestAccountStakes,
} = dataRequestsSlice.actions;

export default dataRequestsSlice.reducer;
