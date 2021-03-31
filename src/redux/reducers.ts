import { combineReducers } from 'redux';

import dataRequest, { DataRequestsState } from './dataRequest/dataRequest';

export interface Reducers {
    dataRequest: DataRequestsState;
}

export default combineReducers<Reducers>({
    dataRequest,
});
