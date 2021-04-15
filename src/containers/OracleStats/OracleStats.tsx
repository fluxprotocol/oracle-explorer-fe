import React from 'react';

import s from './OracleStats.module.scss';
import trans from '../../translation/trans';
import StatCard from './components/StatCard/StatCard';

interface Props {
    totalRequests: string;
}

export default function OracleStats({
    totalRequests,
}: Props) {
    return (
        <div className={s.root}>
            <StatCard
                label={trans('oracleStats.label.totalRequests')}
                value={totalRequests}
            />
            <StatCard
                label={trans('oracleStats.label.tokenPrice')}
                value="$0.30"
            />
            <StatCard
                label={trans('oracleStats.label.tokenMarketCap')}
                value="$56.8M"
            />
        </div>
    );
}
