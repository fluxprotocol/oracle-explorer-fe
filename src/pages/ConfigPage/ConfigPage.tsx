import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import OracleConfigInfoCardConnector from '../../connectors/OracleConfigInfoCardConnector';
import Page from '../../containers/Page';
import { loadOracleConfig } from '../../redux/oracleConfig/oracleConfigActions';
import trans from '../../translation/trans';

interface Params {
    id: string;
    provider: string;
}

export default function ConfigPage() {
    const dispatch = useDispatch();
    const params = useParams<Params>();

    console.log('[] params -> ', params);

    useEffect(() => {
        dispatch(loadOracleConfig(params.id));
    }, [dispatch, params.id]);

    return (
        <Page>
            <h1>{trans('oracleConfig.title', { id: params.id })}</h1>
            <OracleConfigInfoCardConnector />
        </Page>
    );
}
