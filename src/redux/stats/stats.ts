import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataRequestListItem } from '../../models/DataRequest';

export type StatsState = Readonly<{
    totalRequests: string;
    tokenPrice: number;
    tokenMarketCap: number;
    latestRequests: DataRequestListItem[];
}>;

const initialState: StatsState = {
    totalRequests: '0',
    tokenPrice: 0,
    tokenMarketCap: 0,
    latestRequests: [],
};

const statsSlice = createSlice({
    initialState,
    name: 'stats',
    reducers: {
        setTotalRequestsStat(state: StatsState, action: PayloadAction<string>): StatsState {
            return ({
                ...state,
                totalRequests: action.payload,
            });
        },

        setTokenPriceStat(state: StatsState, action: PayloadAction<number>): StatsState {
            return ({
                ...state,
                tokenPrice: action.payload,
            });
        },

        setTokenMarketCapStat(state: StatsState, action: PayloadAction<number>): StatsState {
            return ({
                ...state,
                tokenMarketCap: action.payload,
            });
        },

        setLatestRequestsStat(state: StatsState, action: PayloadAction<DataRequestListItem[]>): StatsState {
            return ({
                ...state,
                latestRequests: action.payload,
            });
        },
    },
});

export const {
    setTokenMarketCapStat,
    setTokenPriceStat,
    setTotalRequestsStat,
    setLatestRequestsStat,
} = statsSlice.actions;

export default statsSlice.reducer;
