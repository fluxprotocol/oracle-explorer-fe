import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DataRequestsOverviewConnector from '../../connectors/DataRequestsOverviewConnector';
import Page from '../../containers/Page';
import { loadDataRequests } from '../../redux/dataRequest/dataRequestAction';


export default function DataRequestsPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadDataRequests())
    }, [dispatch]);

    return (
        <Page>
            <DataRequestsOverviewConnector />
        </Page>
    );
}
