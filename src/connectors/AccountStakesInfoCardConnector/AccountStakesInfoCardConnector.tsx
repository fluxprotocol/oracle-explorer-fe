import React from 'react';
import { useSelector } from 'react-redux';
import AccountStakesInfoCard from '../../containers/AccountStakesInfoCard';
import { Reducers } from '../../redux/reducers';


export default function AccountStakesInfoCardConnector() {
    const dataRequest = useSelector((store: Reducers) => store.dataRequest.dataRequestDetail);
    const finalizedOutcome = useSelector((store: Reducers) => store.dataRequest.dataRequestDetail?.finalized_outcome);
    const resolutionWindows = useSelector((store: Reducers) => store.dataRequest.dataRequestDetail?.resolutionWindows) ?? [];

    let finalizedRound: number | undefined = undefined;

    if (finalizedOutcome) {
        // -2 because the last round is always an open window
        finalizedRound = resolutionWindows[resolutionWindows.length - 2].round;
    }

    if (!dataRequest) return null;

    return (
        <AccountStakesInfoCard
            accountStakes={dataRequest.loggedInAccountStakes}
            claim={dataRequest.loggedInAccountClaim}
            finalizedOutcome={finalizedOutcome}
            finalizedRound={finalizedRound}
            stakeToken={dataRequest.stakeToken}
        />
    );
}
