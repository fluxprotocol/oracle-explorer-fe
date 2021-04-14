import React from 'react';
import { useSelector } from 'react-redux';
import OutcomeStakesOverview from '../../containers/OutcomeStakesOverview';
import { Reducers } from '../../redux/reducers';


export default function AccountUnclaimedStakesConnector() {
    const unclaimedStakes = useSelector((store: Reducers) => store.account.accountDetail.unclaimedStakes);

    return (
        <OutcomeStakesOverview
            totalItems={0}
            page={0}
            onRequestPageChange={() => {}}
            outcomeStakes={unclaimedStakes}
            showPagination={false}
        />
    );
}
