import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import DataRequestsOverviewFilters from '../../containers/DataRequestsOverviewFilters';
import { setDataRequestFilters } from '../../redux/dataRequest/dataRequest';
import { loadDataRequests } from '../../redux/dataRequest/dataRequestAction';
import { Reducers } from '../../redux/reducers';
import { routePaths } from '../../routes';
import { DataRequestFilters } from '../../services/DataRequestService';

interface Params {
    page: string;
}

export default function DataRequestsOverviewFiltersConnector() {
    const dispatch = useDispatch();
    const totalRequests = useSelector((store: Reducers) => store.dataRequest.totalDataRequests);
    const params = useParams<Params>();
    const history = useHistory();
    const urlParams = new URLSearchParams(history.location.search);
    const filters: DataRequestFilters = {
        onlyArbitratorRequests: urlParams.get('onlyArbitratorRequests') === 'true',
    };

    function onFilterChange(filters: DataRequestFilters) {
        const url = new URLSearchParams();
        url.append('onlyArbitratorRequests', '' + filters.onlyArbitratorRequests);

        history.replace({
            pathname: routePaths.dataRequests(params.page),
            search: url.toString(),
        });
    }

    useEffect(() => {
        dispatch(setDataRequestFilters(filters));
        dispatch(loadDataRequests(Number(params.page)));
    }, [urlParams.toString(), dispatch, params]);

    return (
        <DataRequestsOverviewFilters
            totalRequests={totalRequests.toString()}
            filters={filters}
            onFilterChange={onFilterChange}
        />
    );
}
