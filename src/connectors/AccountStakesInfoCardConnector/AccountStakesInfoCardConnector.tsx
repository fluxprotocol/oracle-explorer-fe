import React from 'react';
import { useSelector } from 'react-redux';
import AccountStakesInfoCard from '../../containers/AccountStakesInfoCard';
import { Reducers } from '../../redux/reducers';


export default function AccountStakesInfoCardConnector() {
    const accountStakes = useSelector((store: Reducers) => store.dataRequest.accountStakes);
    const claim = useSelector((store: Reducers) => store.dataRequest.dataRequestDetail?.claimInfo);
    const finalizedOutcome = useSelector((store: Reducers) => store.dataRequest.dataRequestDetail?.finalized_outcome);
    const resolutionWindows = useSelector((store: Reducers) => store.dataRequest.dataRequestDetail?.resolutionWindows) ?? [];
    let finalizedRound: number | undefined = undefined;

    if (finalizedOutcome) {
        // -2 because the last round is always an open window
        finalizedRound = resolutionWindows[resolutionWindows.length - 2].round;
    }

    return (
        <AccountStakesInfoCard
            accountStakes={accountStakes}
            claim={claim}
            finalizedOutcome={finalizedOutcome}
            finalizedRound={finalizedRound}
        />
    );
}
