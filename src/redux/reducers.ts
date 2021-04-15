import { combineReducers } from 'redux';

import dataRequest, { DataRequestsState } from './dataRequest/dataRequest';
import account, { AccountState } from './account/account';
import dialogs, { DialogsState } from './dialogs/dialogs';
import stats, { StatsState } from './stats/stats';

export interface Reducers {
    dataRequest: DataRequestsState;
    account: AccountState;
    dialogs: DialogsState;
    stats: StatsState;
}

export default combineReducers<Reducers>({
    account,
    dataRequest,
    dialogs,
    stats,
});
