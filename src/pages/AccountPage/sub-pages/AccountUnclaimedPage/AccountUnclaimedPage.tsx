import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import AccountUnclaimedStakesConnector from '../../../../connectors/AccountUnclaimedStakesConnector';
import { loadUnclaimedAccountStakes } from '../../../../redux/account/accountActions';

interface Params {
    provider: string;
    accountId: string;
}

export default function AccountUnclaimedPage() {
    const dispatch = useDispatch();
    const params = useParams<Params>();

    useEffect(() => {
        dispatch(loadUnclaimedAccountStakes(params.accountId));
    }, [dispatch, params]);

    return (
        <div>
            <AccountUnclaimedStakesConnector />
        </div>
    );
}
