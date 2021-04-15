import React from 'react';
import { useSelector } from 'react-redux';
import DataRequestsOverview from '../../containers/DataRequestsOverview';
import { Reducers } from '../../redux/reducers';


export default function HomeDataRequestsConnector() {
    const latestRequests = useSelector((store: Reducers) => store.stats.latestRequests);

    return (
        <DataRequestsOverview
            dataRequests={latestRequests}
            page={0}
            totalItems={latestRequests.length}
            onRequestPageChange={() => {}}
            showPagination={false}
        />
    );
}
