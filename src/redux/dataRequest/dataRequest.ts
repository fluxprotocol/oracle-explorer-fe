import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DataRequestViewModel } from '../../models/DataRequest';

export type DataRequestsState = Readonly<{
    dataRequests: DataRequestViewModel[];
    error?: string[];
    detailLoading: boolean;
    loading: boolean;
    dataRequestDetail?: DataRequestViewModel;
}>;

const initialState: DataRequestsState = {
    detailLoading: false,
    loading: false,
    dataRequests: [],
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
        setDataRequests(state: DataRequestsState, action: PayloadAction<DataRequestViewModel[]>): DataRequestsState {
            return ({
                ...state,
                dataRequests: action.payload,
            });
        },
        setDataRequestDetail(state: DataRequestsState, action: PayloadAction<DataRequestViewModel>): DataRequestsState {
            return ({
                ...state,
                dataRequestDetail: action.payload,
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
} = dataRequestsSlice.actions;

export default dataRequestsSlice.reducer;
