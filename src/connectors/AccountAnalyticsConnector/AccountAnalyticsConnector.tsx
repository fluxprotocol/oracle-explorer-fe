import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import LineChart from '../../containers/LineChart';
import { loadAccountAnalytics } from '../../redux/account/accountActions';
import { Reducers } from '../../redux/reducers';
import { Period } from '../../services/AnalyticsService';
import trans from '../../translation/trans';
import { formatToken } from '../../utils/tokenUtils';

interface Params {
    accountId: string;
    provider: string;
}

export default function AccountAnalyticsConnector() {
    const dispatch = useDispatch();
    const params = useParams<Params>();
    const [period, setPeriod] = useState(Period.OneMonth);
    const payoutPoints = useSelector((store: Reducers) => store.account.accountDetail.payoutAnalytics.data);
    const appConfig = useSelector((store: Reducers) => store.appconfig.appConfig);

    useEffect(() => {
        dispatch(loadAccountAnalytics(params.accountId, period));
    }, [params.accountId, period, dispatch]);

    const handlePeriodChange = useCallback((newPeriod) => {
        setPeriod(newPeriod);
    }, []);

    return (
        <LineChart
            period={period}
            labels={payoutPoints.map(point => point.key)}
            onPeriodChange={handlePeriodChange}
            items={[
                {
                    label: trans('accountAnalytics.labels.feePayout'),
                    points: payoutPoints.map(point => Number(formatToken(point.data[1], appConfig.bondTokenDecimals, 4))),
                    afterText: appConfig.bondTokenSymbol,
                    lineColor: '#252525',
                    fill: false,
                },
                {
                    label: trans('accountAnalytics.labels.stakePayout'),
                    points: payoutPoints.map(point => Number(formatToken(point.data[0], appConfig.stakeTokenDecimals, 4))),
                    afterText: appConfig.stakeTokenSymbol,
                    lineColor: '#9ec8f1',
                    fill: true,
                },
            ]}
        />
    );
}
