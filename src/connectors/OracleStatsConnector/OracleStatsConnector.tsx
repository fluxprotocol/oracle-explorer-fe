import React from 'react';
import { useSelector } from 'react-redux';
import OracleStats from '../../containers/OracleStats';
import { Reducers } from '../../redux/reducers';


export default function OracleStatsConnector() {
    const totalRequests = useSelector((store: Reducers) => store.stats.totalRequests);
    const tokenPrice = useSelector((store: Reducers) => store.stats.tokenPrice);
    const tokenMarketCap = useSelector((store: Reducers) => store.stats.tokenMarketCap);

    return (
        <OracleStats
            totalRequests={totalRequests}
            tokenMarketCap={tokenMarketCap}
            tokenPrice={tokenPrice}
        />
    );
}
