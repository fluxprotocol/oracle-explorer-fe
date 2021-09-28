import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import LineChart from '../../containers/LineChart';
import { loadRequestorInvalidAnalytics } from '../../redux/account/accountActions';
import { Reducers } from '../../redux/reducers';
import { Period } from '../../services/AnalyticsService';
import trans from '../../translation/trans';

interface Params {
    accountId: string;
    provider: string;
}

export default function RequestorAnalyticsConnector() {
    const dispatch = useDispatch();
    const params = useParams<Params>();
    const [period, setPeriod] = useState(Period.OneMonth);
    const dataPoints = useSelector((store: Reducers) => store.account.accountDetail.invalidRequestsAnalytics.data);

    useEffect(() => {
        dispatch(loadRequestorInvalidAnalytics(params.accountId, period));
    }, [params.accountId, period, dispatch]);

    const handlePeriodChange = useCallback((newPeriod) => {
        setPeriod(newPeriod);
    }, []);

    return (
        <LineChart
            period={period}
            labels={dataPoints.map(point => point.key)}
            onPeriodChange={handlePeriodChange}
            items={[
                {
                    label: trans('requestorAnalytics.labels.invalidRequests'),
                    points: dataPoints.map(point => Number(point.data[0])),
                    lineColor: '#9ec8f1',
                    fill: true,
                },
            ]}
        />
    );
}
