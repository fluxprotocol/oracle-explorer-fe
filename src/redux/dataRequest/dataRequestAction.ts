import { DEFAULT_PAGINATION_LIMIT } from '../../config';
import { StakeFormValues } from '../../containers/StakeDialog/services/createDefaultStakeFormValues';
import { DataRequestViewModel } from '../../models/DataRequest';
import { Outcome, OutcomeType } from '../../models/DataRequestOutcome';
import { combineOutcomeStakes, OutcomeStake } from '../../models/OutcomeStake';
import { ResolutionWindow } from '../../models/ResolutionWindow';
import { UserStakeViewModel } from '../../models/UserStakes';
import { getAllDataRequests, getDataRequestById } from '../../services/DataRequestService';
import { claimWithProvider, finalizeWithProvider, getLoggedInAccountId, stakeWithProvider, unstakeWithProvider } from '../../services/providers/ProviderRegistry';
import { getUserStakesByRequestId } from '../../services/UserStakeService';
import { Reducers } from '../reducers';
import { setDataRequestDetailLoading, setDataRequestDetail, setDataRequestsLoading, setDataRequests, setTotalDataRequest, setDataRequestsErrors, setDataRequestAccountStakes } from './dataRequest';

export function loadDataRequests(page: number) {
    return async (dispatch: Function, getState: () => Reducers) => {
        const store = getState();
        dispatch(setDataRequestsLoading(true));

        const offset = DEFAULT_PAGINATION_LIMIT * page;
        const result = await getAllDataRequests({
            limit: DEFAULT_PAGINATION_LIMIT,
            offset,
        }, store.dataRequest.dataRequestFilters);

        dispatch(setDataRequests(result.items));
        dispatch(setTotalDataRequest(result.total));
        dispatch(setDataRequestsLoading(false));
    }
}

export function unloadDataRequest() {
    return (dispatch: Function) => {
        dispatch(setDataRequestDetail(undefined));
        dispatch(setDataRequestAccountStakes([]));
    }
}

export function loadDataRequestById(id: string) {
    return async (dispatch: Function) => {
        dispatch(setDataRequestDetailLoading(true));
        const accountId = await getLoggedInAccountId();
        const accountStakesRequest = getUserStakesByRequestId(id, accountId);
        const dataRequest = await getDataRequestById(id, accountId);

        if (!dataRequest) {
            setDataRequestsErrors(['404']);
            return;
        }

        const accountStakes = await accountStakesRequest;
        let accountOutcomeStakes: OutcomeStake[] = [];

        if (accountId && accountStakes[accountId]) {
            accountOutcomeStakes = combineOutcomeStakes(accountStakes[accountId]);
        }

        dispatch(setDataRequestAccountStakes(accountOutcomeStakes));
        dispatch(setDataRequestDetail(dataRequest));
        dispatch(setDataRequestDetailLoading(false));
    }
}

export function stakeDataRequest(dataRequest: DataRequestViewModel, stakeFormValues: StakeFormValues) {
    return async (dispatch: Function) => {
        let outcome: Outcome = {
            type: OutcomeType.Invalid,
        };

        if (!stakeFormValues.isInvalid) {
            outcome = {
                answer: stakeFormValues.answer,
                type: OutcomeType.Answer,
            };
        }

        await stakeWithProvider('near', stakeFormValues.amount, dataRequest, outcome);
    }
}

export function finalizeDataRequest(dataRequest: DataRequestViewModel) {
    return async (dispatch: Function) => {
        await finalizeWithProvider('near', dataRequest);
    }
}

export function claimDataRequest(accountId: string, dataRequest: DataRequestViewModel) {
    return async (dispatch: Function) => {
        await claimWithProvider('near', accountId, dataRequest);
    }
}

export function unstakeDataRequest(amount: string, dataRequest: DataRequestViewModel, stakedOutcome: UserStakeViewModel) {
    return async (dispatch: Function) => {
        await unstakeWithProvider('near', amount, stakedOutcome.round, dataRequest, stakedOutcome.outcome);
    }
}
