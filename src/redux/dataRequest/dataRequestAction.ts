import { DEFAULT_PAGINATION_LIMIT } from '../../config';
import { getAllDataRequests, getDataRequestById } from '../../services/DataRequestService';
import { Reducers } from '../reducers';
import { setDataRequestDetailLoading, setDataRequestDetail, setDataRequestsLoading, setDataRequests, setTotalDataRequest, setDataRequestsErrors } from './dataRequest';

export function loadDataRequests(page: number, reset = false) {
    return async (dispatch: Function, getState: () => Reducers) => {
        dispatch(setDataRequestsLoading(true));

        if (reset) {
            dispatch(setDataRequests([]));
        }

        const offset = DEFAULT_PAGINATION_LIMIT * page;
        const result = await getAllDataRequests({
            limit: DEFAULT_PAGINATION_LIMIT,
            offset,
        });

        dispatch(setDataRequests(result.items));
        dispatch(setTotalDataRequest(result.total));
        dispatch(setDataRequestsLoading(false));
    }
}


export function loadDataRequestById(id: string) {
    return async (dispatch: Function) => {
        dispatch(setDataRequestDetailLoading(true));
        const dataRequest = await getDataRequestById(id);

        if (!dataRequest) {
            setDataRequestsErrors(['404']);
            return;
        }

        dispatch(setDataRequestDetail(dataRequest));
        dispatch(setDataRequestDetailLoading(false));
    }
}
