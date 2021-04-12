import { combineReducers } from 'redux';

import dataRequest, { DataRequestsState } from './dataRequest/dataRequest';
import account, { AccountState } from './account/account';
import dialogs, { DialogsState } from './dialogs/dialogs';

export interface Reducers {
    dataRequest: DataRequestsState;
    account: AccountState;
    dialogs: DialogsState;
}

export default combineReducers<Reducers>({
    account,
    dataRequest,
    dialogs,
});
