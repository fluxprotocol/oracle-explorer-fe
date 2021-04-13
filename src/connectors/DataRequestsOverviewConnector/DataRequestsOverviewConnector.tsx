import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import DataRequestsOverview from '../../containers/DataRequestsOverview';
import { Reducers } from '../../redux/reducers';
import { routePaths } from '../../routes';

interface Props {
    page: number;
}

export default function DataRequestsOverviewConnector({
    page,
}: Props) {
    const history = useHistory();
    const dataRequests = useSelector((store: Reducers) => store.dataRequest.dataRequests);
    const totalItems = useSelector((store: Reducers) => store.dataRequest.totalDataRequests);

    const handleRequestPageChange = useCallback((page: number) => {
        history.push(routePaths.dataRequests(page.toString()));
    }, [history]);

    return (
        <DataRequestsOverview
            dataRequests={dataRequests}
            page={page}
            totalItems={totalItems}
            onRequestPageChange={handleRequestPageChange}
        />
    );
}
