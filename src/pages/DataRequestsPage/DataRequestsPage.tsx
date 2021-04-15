import useInterval from '@use-it/interval';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import DataRequestsOverviewConnector from '../../connectors/DataRequestsOverviewConnector';
import Page from '../../containers/Page';
import { loadDataRequests } from '../../redux/dataRequest/dataRequestAction';
import { Reducers } from '../../redux/reducers';
import trans from '../../translation/trans';
import { REQUEST_LIST_REFRESH_INTERVAL } from '../../config';

import s from './DataRequestsPage.module.scss';

interface Params {
    page: string;
}

export default function DataRequestsPage() {
    const dispatch = useDispatch();
    const totalRequests = useSelector((store: Reducers) => store.dataRequest.totalDataRequests);
    const params = useParams<Params>();

    useEffect(() => {
        dispatch(loadDataRequests(Number(params.page)));
    }, [dispatch, params]);

    useInterval(() => {
        dispatch(loadDataRequests(Number(params.page)));
    }, REQUEST_LIST_REFRESH_INTERVAL);

    return (
        <Page>
            <div>
                <h1>{trans('dataRequests.title')}</h1>
                <span className={s.subtitle}>{trans('dataRequest.subtitle', { total: totalRequests.toString() })}</span>
            </div>
            <DataRequestsOverviewConnector page={Number(params.page)} />
        </Page>
    );
}
