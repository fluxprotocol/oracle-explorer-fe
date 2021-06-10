import { combineReducers } from 'redux';

import dataRequest, { DataRequestsState } from './dataRequest/dataRequest';
import account, { AccountState } from './account/account';
import dialogs, { DialogsState } from './dialogs/dialogs';
import stats, { StatsState } from './stats/stats';
import oracleConfig, { OracleConfigState } from './oracleConfig/oracleConfig';
import appconfig, { AppConfigState } from './appconfig/appconfig';

export interface Reducers {
    dataRequest: DataRequestsState;
    account: AccountState;
    dialogs: DialogsState;
    stats: StatsState;
    oracleConfig: OracleConfigState;
    appconfig: AppConfigState;
}

export default combineReducers<Reducers>({
    account,
    appconfig,
    dataRequest,
    dialogs,
    stats,
    oracleConfig,
});
