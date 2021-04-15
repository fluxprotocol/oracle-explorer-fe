import useInterval from '@use-it/interval';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HOME_REFRESH_INTERVAL } from '../../config';
import HomeDataRequestsConnector from '../../connectors/HomeDataRequestsConnector';
import HomeHeaderConnector from '../../connectors/HomeHeaderConnector';
import OracleStatsConnector from '../../connectors/OracleStatsConnector';

import Page from '../../containers/Page';
import { loadStats } from '../../redux/stats/statsActions';
import trans from '../../translation/trans';


export default function HomePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadStats());
    }, [dispatch]);

    useInterval(() => {
        dispatch(loadStats());
    }, HOME_REFRESH_INTERVAL);

    return (
        <Page>
            <HomeHeaderConnector />
            <OracleStatsConnector />
            <h2>{trans('homePage.title.latestRequests')}</h2>
            <HomeDataRequestsConnector />
        </Page>
    );
}
