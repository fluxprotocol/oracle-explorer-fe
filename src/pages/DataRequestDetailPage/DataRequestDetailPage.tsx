import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import useInterval from '@use-it/interval';
import classnames from 'classnames';

import AccountStakesInfoCardConnector from '../../connectors/AccountStakesInfoCardConnector';
import CallDataInfoConnector from '../../connectors/CallDataInfoConnector';
import DataRequestDetailHeaderConnector from '../../connectors/DataRequestDetailHeaderConnector';
import RequestInfoConnector from '../../connectors/RequestInfoConnector';
import StakeDialogConnector from '../../connectors/StakeDialogConnector';
import ResolutionWindowsInfoConnector from '../../connectors/ResolutionWindowsInfoConnector';
import Page from '../../containers/Page';
import { loadDataRequestById, unloadDataRequest } from '../../redux/dataRequest/dataRequestAction';
import { Reducers } from '../../redux/reducers';
import { REQUEST_DETAIL_REFRESH_INTERVAL } from '../../config';
import UnstakeDialogConnector from '../../connectors/UnstakeDialogConnector';

import s from './DataRequestDetailPage.module.scss';

interface RouterParams {
    id: string;
}

export default function DataRequestDetailPage() {
    const dispatch = useDispatch();
    const { id } = useParams<RouterParams>();
    const account = useSelector((store: Reducers) => store.account.account);

    useEffect(() => {
        dispatch(loadDataRequestById(id));

        return () => {
            dispatch(unloadDataRequest());
        }
    }, [dispatch, id]);

    useInterval(() => {
        dispatch(loadDataRequestById(id));
    }, REQUEST_DETAIL_REFRESH_INTERVAL);

    return (
        <Page>
            <DataRequestDetailHeaderConnector />
            <StakeDialogConnector />
            <UnstakeDialogConnector />
            <RequestInfoConnector className={s.card} />
            {account && <AccountStakesInfoCardConnector />}
            <CallDataInfoConnector className={s.card} />
            <ResolutionWindowsInfoConnector className={classnames(s.card, s.lastCard)} />
        </Page>
    );
}
