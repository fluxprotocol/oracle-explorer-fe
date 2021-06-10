import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataRequestViewModel } from '../../models/DataRequest';

export type DialogsState = Readonly<{
    stakeDialog: {
        open: boolean;
        dataRequest?: DataRequestViewModel;
    },
    unstakeDialog: {
        open: boolean;
        dataRequest?: DataRequestViewModel;
    },
    storageManager: {
        open: boolean;
    }
}>;

const initialState: DialogsState = {
    stakeDialog: {
        open: false,
    },
    unstakeDialog: {
        open: false,
    },
    storageManager: {
        open: false,
    }
};

const dialogsSlice = createSlice({
    initialState,
    name: 'dialogs',
    reducers: {
        setStakeDialogOpen(state: DialogsState, action: PayloadAction<DialogsState['stakeDialog']>): DialogsState {
            return ({
                ...state,
                stakeDialog: action.payload,
            });
        },

        setUnstakeDialogOpen(state: DialogsState, action: PayloadAction<DialogsState['unstakeDialog']>): DialogsState {
            return ({
                ...state,
                unstakeDialog: action.payload,
            });
        },

        setStorageManagerDialogOpen(state: DialogsState, action: PayloadAction<DialogsState['storageManager']>): DialogsState {
            return {
                ...state,
                storageManager: action.payload,
            };
        }
    },
});

export const {
    setStakeDialogOpen,
    setUnstakeDialogOpen,
    setStorageManagerDialogOpen,
} = dialogsSlice.actions;

export default dialogsSlice.reducer;
