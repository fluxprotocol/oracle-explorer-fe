import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import CallDataInfoConnector from '../../connectors/CallDataInfoConnector';
import RequestInfoConnector from '../../connectors/RequestInfoConnector';
import StakerReportInfoConnector from '../../connectors/StakersReportInfoConnector';
import Page from '../../containers/Page';
import { loadDataRequestById } from '../../redux/dataRequest/dataRequestAction';
import trans from '../../translation/trans';

import s from './DataRequestDetailPage.module.scss';

interface RouterParams {
    id: string;
}

export default function DataRequestDetailPage() {
    const dispatch = useDispatch();
    const { id } = useParams<RouterParams>();

    useEffect(() => {
        dispatch(loadDataRequestById(id));
    }, [dispatch, id]);

    return (
        <Page>
            <h1>{trans('dataRequestDetail.title', { id })}</h1>

            <RequestInfoConnector className={s.card} />
            <CallDataInfoConnector className={s.card} />
            <StakerReportInfoConnector className={s.card} />
        </Page>
    );
}
