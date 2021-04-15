import useInterval from '@use-it/interval';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import DataRequestsOverviewConnector from '../../connectors/DataRequestsOverviewConnector';
import Page from '../../containers/Page';
import { loadDataRequests } from '../../redux/dataRequest/dataRequestAction';
import { REQUEST_LIST_REFRESH_INTERVAL } from '../../config';
import DataRequestsOverviewFiltersConnector from '../../connectors/DataRequestsOverviewFiltersConnector';

interface Params {
    page: string;
}

export default function DataRequestsPage() {
    const dispatch = useDispatch();
    const params = useParams<Params>();

    useInterval(() => {
        dispatch(loadDataRequests(Number(params.page)));
    }, REQUEST_LIST_REFRESH_INTERVAL);

    return (
        <Page>
            <DataRequestsOverviewFiltersConnector />
            <DataRequestsOverviewConnector page={Number(params.page)} />
        </Page>
    );
}
