import React from 'react';
import { useSelector } from 'react-redux';
import OracleConfigInfoCard from '../../containers/OracleConfigInfoCard';
import { Reducers } from '../../redux/reducers';


export default function OracleConfigInfoCardConnector() {
    const oracleConfig = useSelector((store: Reducers) => store.oracleConfig.detail);

    if (!oracleConfig) {
        return null;
    }

    return (
        <OracleConfigInfoCard
            oracleConfig={oracleConfig}
        />
    );
}
