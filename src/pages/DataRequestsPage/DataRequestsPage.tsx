import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataRequestsOverviewConnector from '../../connectors/DataRequestsOverviewConnector';
import Page from '../../containers/Page';
import { loadDataRequests } from '../../redux/dataRequest/dataRequestAction';
import { Reducers } from '../../redux/reducers';
import trans from '../../translation/trans';

import s from './DataRequestsPage.module.scss';

export default function DataRequestsPage() {
    const dispatch = useDispatch();
    const totalRequests = useSelector((store: Reducers) => store.dataRequest.totalDataRequests);

    useEffect(() => {
        dispatch(loadDataRequests())
    }, [dispatch]);

    return (
        <Page>
            <div>
                <h1>{trans('dataRequests.title')}</h1>
                <span className={s.subtitle}>{trans('dataRequest.subtitle', { total: totalRequests.toString() })}</span>
            </div>
            <DataRequestsOverviewConnector />
        </Page>
    );
}
