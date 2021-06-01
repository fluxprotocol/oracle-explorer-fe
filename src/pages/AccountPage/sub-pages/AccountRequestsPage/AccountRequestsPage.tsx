import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import AccountRequestsConnector from '../../../../connectors/AccountRequestsConnector';
import { loadAccountRequests } from '../../../../redux/account/accountActions';

interface Params {
    provider: string;
    accountId: string;
}

export default function AccountRequestsPage() {
    const dispatch = useDispatch();
    const params = useParams<Params>();

    useEffect(() => {
        dispatch(loadAccountRequests(0, params.accountId));
    }, [dispatch, params.accountId]);

    return (
        <div>
            <AccountRequestsConnector />
        </div>
    );
}
