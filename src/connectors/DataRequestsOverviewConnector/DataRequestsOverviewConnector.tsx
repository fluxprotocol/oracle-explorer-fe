import React from 'react';
import { useSelector } from 'react-redux';
import DataRequestsOverview from '../../containers/DataRequestsOverview';
import { Reducers } from '../../redux/reducers';


export default function DataRequestsOverviewConnector() {
    const dataRequests = useSelector((store: Reducers) => store.dataRequest.dataRequests);

    return (
        <DataRequestsOverview dataRequests={dataRequests} />
    );
}
