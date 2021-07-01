import Big from 'big.js';
import React, { useCallback, useState } from 'react';
import Button from '../../components/Button';
import Countdown from '../../compositions/Countdown';
import { Account } from '../../models/Account';
import { canDataRequestBeFinalized, DataRequestViewModel } from '../../models/DataRequest';
import { OutcomeStake } from '../../models/OutcomeStake';
import { ResolutionWindow } from '../../models/ResolutionWindow';
import trans from '../../translation/trans';
import { sumBigs } from '../../utils/bigUtils';

import s from './DataRequestDetailHeader.module.scss';

interface Props {
    dataRequest: DataRequestViewModel;
    onStakeClick: () => void;
    onUnstakeClick: () => void;
    onClaimClick: () => void;
    onFinalizeClick: () => void;
    account?: Account;
    accountStakes: OutcomeStake[];
}

export default function DataRequestDetailHeader({
    dataRequest,
    onStakeClick,
    onClaimClick,
    onUnstakeClick,
    onFinalizeClick,
    account,
    accountStakes,
}: Props) {
    const now = new Date();
    const [canInteract, setInteract] = useState(dataRequest.settlementTime.getTime() <= now.getTime());
    const currentResolutionWindow: ResolutionWindow | undefined = dataRequest.resolutionWindows[dataRequest.resolutionWindows.length - 1] ?? undefined;
    const isFinalized = typeof dataRequest.finalized_outcome !== 'undefined';
    const canFinalize = canDataRequestBeFinalized(dataRequest);

    const hasClaimed = Boolean(dataRequest.loggedInAccountClaim?.payout);
    const roundStakes = accountStakes.filter(stake => stake.round === currentResolutionWindow?.round);
    const stakedOnRound = sumBigs(roundStakes.map(roundStake => new Big(roundStake.stake)));

    const onCountdownComplete = useCallback(() => {
        setInteract(true);
    }, []);

    return (
        <header className={s.header}>
            <h1>{trans('dataRequestDetail.title', { id: dataRequest.id })}</h1>
            <div className={s.actions}>
                {!canInteract && (
                    <span>
                        {trans('dataRequestDetail.canBeResolvedIn')}
                        <Countdown
                            date={dataRequest.settlementTime}
                            onComplete={onCountdownComplete}
                        />
                    </span>
                )}

                {canInteract && account && !isFinalized && (
                    <Button className={s.button} onClick={onStakeClick}>
                        {trans('dataRequestDetail.label.stake')}
                    </Button>
                )}

                {canInteract && account && stakedOnRound.gt(0) && (
                    <Button className={s.button} onClick={onUnstakeClick}>
                        {trans('dataRequestDetail.label.unstake')}
                    </Button>
                )}

                {canInteract && account && canFinalize && (
                    <Button className={s.button} onClick={onFinalizeClick}>
                        {trans('dataRequestDetail.label.finalize')}
                    </Button>
                )}

                {canInteract && account && !hasClaimed && accountStakes.length > 0 && isFinalized && (
                    <Button className={s.button} onClick={onClaimClick}>
                        {trans('dataRequestDetail.label.claim')}
                    </Button>
                )}
            </div>
        </header>
    );
}
