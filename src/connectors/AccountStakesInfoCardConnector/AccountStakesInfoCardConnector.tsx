import React from 'react';
import { useSelector } from 'react-redux';
import AccountStakesInfoCard from '../../containers/AccountStakesInfoCard';
import { Reducers } from '../../redux/reducers';


export default function AccountStakesInfoCardConnector() {
    const accountStakes = useSelector((store: Reducers) => store.dataRequest.accountStakes);

    return (
        <AccountStakesInfoCard
            accountStakes={accountStakes}
        />
    );
}
