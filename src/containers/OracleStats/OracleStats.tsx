import React from 'react';
import millify from 'millify';

import s from './OracleStats.module.scss';
import trans from '../../translation/trans';
import StatCard from './components/StatCard/StatCard';
import { AppConfig } from '../../models/AppConfig';

interface Props {
    totalRequests: string;
    tokenPrice: number;
    tokenMarketCap: number;
    appConfig: AppConfig;
}

export default function OracleStats({
    totalRequests,
    tokenMarketCap,
    tokenPrice,
    appConfig,
}: Props) {
    const marketCapFormatted = millify(tokenMarketCap);

    return (
        <div className={s.root}>
            <StatCard
                label={trans('oracleStats.label.totalRequests')}
                value={totalRequests}
            />
            <StatCard
                label={trans('oracleStats.label.tokenPrice', { tokenSymbol: appConfig.stakeTokenSymbol })}
                value={`$${tokenPrice}`}
            />
            <StatCard
                label={trans('oracleStats.label.tokenMarketCap')}
                value={`$${marketCapFormatted}`}
            />
        </div>
    );
}
