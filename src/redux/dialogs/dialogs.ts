import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataRequestViewModel } from '../../models/DataRequest';

export type DialogsState = Readonly<{
    stakeDialog: {
        open: boolean;
        dataRequest?: DataRequestViewModel;
    }
}>;

const initialState: DialogsState = {
    stakeDialog: {
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
    },
});

export const {
    setStakeDialogOpen,
} = dialogsSlice.actions;

export default dialogsSlice.reducer;
