import { DataRequestViewModel } from '../../models/DataRequest';
import { setDataRequestDetailLoading, setDataRequestDetail, setDataRequestsLoading, setDataRequests, setTotalDataRequest } from './dataRequest';

function createDataRequestMock(options: Partial<DataRequestViewModel> = {}): DataRequestViewModel {
    return {
        id: 'dahsuohdsaui',
        requestor: 'huasdhdasuihdasiuhdasi.near',
        settlementTime: new Date(),
        config: {
            resolutionFeePercentage: 2,
        },
        sources: [{
            endPoint: 'http://google.com',
            sourcePath: 'a.b[0].s',
        }],
        outcomes: ['Yes', 'No'],
        rounds: [{
            round: 0,
            outcomeStakes: {},
            userStakes: {},
        }],
        ...options,
    };
}

export function loadDataRequests() {
    return async (dispatch: Function) => {
        dispatch(setDataRequestsLoading(true));

        dispatch(setDataRequests([
            createDataRequestMock({ id: '3' }),
            createDataRequestMock({ id: '2' }),
            createDataRequestMock({ id: '1' }),
        ]));

        dispatch(setTotalDataRequest(3));
        dispatch(setDataRequestsLoading(false));
    }
}


export function loadDataRequestById(id: string) {
    return async (dispatch: Function) => {
        dispatch(setDataRequestDetailLoading(true));
        dispatch(setDataRequestDetail(createDataRequestMock({ id })));
        dispatch(setDataRequestDetailLoading(false));
    }
}
