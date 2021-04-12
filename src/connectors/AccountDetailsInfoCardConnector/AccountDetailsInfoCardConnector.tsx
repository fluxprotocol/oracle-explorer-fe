import React from 'react';
import { useSelector } from 'react-redux';
import AccountDetailsInfoCard from '../../containers/AccountDetailsInfoCard';
import { Reducers } from '../../redux/reducers';

export default function AccountDetailsInfoCardConnector() {
    const accountDetail = useSelector((store: Reducers) => store.account.accountDetail);

    if (!accountDetail) {
        return null;
    }

    return (
        <AccountDetailsInfoCard account={accountDetail.account} />
    );
}
