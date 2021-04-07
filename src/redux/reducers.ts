import { combineReducers } from 'redux';

import dataRequest, { DataRequestsState } from './dataRequest/dataRequest';
import account, { AccountState } from './account/account';

export interface Reducers {
    dataRequest: DataRequestsState;
    account: AccountState;
}

export default combineReducers<Reducers>({
    account,
    dataRequest,
});
