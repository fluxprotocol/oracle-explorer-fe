import React from 'react';
import { useSelector } from 'react-redux';
import DataRequestsOverview from '../../containers/DataRequestsOverview';
import { Reducers } from '../../redux/reducers';

interface Props {
    page: number;
}

export default function DataRequestsOverviewConnector({
    page,
}: Props) {
    const dataRequests = useSelector((store: Reducers) => store.dataRequest.dataRequests);
    const totalItems = useSelector((store: Reducers) => store.dataRequest.totalDataRequests);

    return (
        <DataRequestsOverview
            dataRequests={dataRequests}
            page={page}
            totalItems={totalItems}
        />
    );
}
