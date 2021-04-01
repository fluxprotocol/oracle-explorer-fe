import { DataRequestViewModel } from '../../models/DataRequest';
import { OutcomeType } from '../../models/DataRequestOutcome';
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
        resolutionWindows: [{
            round: 0,
            outcomeStakes: [],
            userStakes: {},
            bondSize: '100000000000000',
            endTime: new Date(),
        }, {
            round: 1,
            outcomeStakes: [],
            userStakes: {},
            bondedOutcome: 'Tarzan',
            bondSize: '100000000000000',
            endTime: new Date(),
        }, {
            round: 2,
            outcomeStakes: [
                {
                    outcome: {
                        answer: 'Jane',
                        type: OutcomeType.Answer,
                    },
                    stake: '2000000000000000000',
                },
                {
                    outcome: {
                        type: OutcomeType.Invalid,
                    },
                    stake: '2000000000000000000',
                }
            ],
            bondSize: '100000000000000',
            endTime: new Date(),
            userStakes: {
                "franklin.near": [
                    {
                        outcome: {
                            answer: 'Jane',
                            type: OutcomeType.Answer,
                        },
                        stake: '1000000000000000000',
                    },
                    {
                        outcome: {
                            type: OutcomeType.Invalid,
                        },
                        stake: '1000000000000000000',
                    }
                ],
                "sa.near": [
                    {
                        outcome: {
                            answer: 'Jane',
                            type: OutcomeType.Answer,
                        },
                        stake: '1000000000000000000',
                    },
                    {
                        outcome: {
                            type: OutcomeType.Invalid,
                        },
                        stake: '1000000000000000000',
                    }
                ],
            },
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
