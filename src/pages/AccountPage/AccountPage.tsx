import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import AccountDetailsInfoCardConnector from '../../connectors/AccountDetailsInfoCardConnector';
import Page from '../../containers/Page';
import { loadAccount } from '../../redux/account/accountActions';

interface Params {
    provider: string;
    accountId: string;
}

export default function AccountPage() {
    const params = useParams<Params>();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAccount(params.provider, params.accountId));
    }, [dispatch, params]);

    return (
        <Page>
            <div>
                <h1>{params.accountId}</h1>
            </div>
            <AccountDetailsInfoCardConnector />
        </Page>
    );
}
