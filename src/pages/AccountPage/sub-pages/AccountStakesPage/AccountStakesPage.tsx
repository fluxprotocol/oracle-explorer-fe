import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import AccountOutcomeStakesConnector from '../../../../connectors/AccountOutcomeStakesConnector';
import { loadAccountStakes } from '../../../../redux/account/accountActions';

interface Params {
    provider: string;
    accountId: string;
}

export default function AccountStakesPage() {
    const dispatch = useDispatch();
    const params = useParams<Params>();

    useEffect(() => {
        dispatch(loadAccountStakes(0, params.accountId, true));
    }, [dispatch, params]);

    return (
        <div>
            <AccountOutcomeStakesConnector />
        </div>
    );
}
