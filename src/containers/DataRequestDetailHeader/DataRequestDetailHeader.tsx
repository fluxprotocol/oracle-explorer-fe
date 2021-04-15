import Big from 'big.js';
import React from 'react';
import Button from '../../components/Button';
import { Account } from '../../models/Account';
import { canDataRequestBeFinalized, DataRequestViewModel } from '../../models/DataRequest';
import { OutcomeStake } from '../../models/OutcomeStake';
import { ResolutionWindow } from '../../models/ResolutionWindow';
import trans from '../../translation/trans';
import { sumBigs } from '../../utils/bigUtils';
import { formatToken } from '../../utils/tokenUtils';

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
    const currentResolutionWindow: ResolutionWindow | undefined = dataRequest.resolutionWindows[dataRequest.resolutionWindows.length - 1] ?? undefined;
    const isFinalized = typeof dataRequest.finalized_outcome !== 'undefined';
    const canFinalize = canDataRequestBeFinalized(dataRequest);

    const payout = accountStakes.find(stake => stake.claimPayout)?.claimPayout;
    const roundStakes = accountStakes.filter(stake => stake.round === currentResolutionWindow?.round);
    const stakedOnRound = sumBigs(roundStakes.map(roundStake => new Big(roundStake.stake)));

    return (
        <header className={s.header}>
            <h1>{trans('dataRequestDetail.title', { id: dataRequest.id })}</h1>
            <div>
                {account && !isFinalized && (
                    <Button className={s.button} onClick={onStakeClick}>
                        {trans('dataRequestDetail.label.stake')}
                    </Button>
                )}

                {account && !isFinalized && stakedOnRound.gt(0) && (
                    <Button className={s.button} onClick={onUnstakeClick}>
                        {trans('dataRequestDetail.label.unstake')}
                    </Button>
                )}

                {account && canFinalize && (
                    <Button className={s.button} onClick={onFinalizeClick}>
                        {trans('dataRequestDetail.label.finalize')}
                    </Button>
                )}

                {account && !Boolean(payout) && accountStakes.length > 0 && isFinalized && (
                    <Button className={s.button} onClick={onClaimClick}>
                        {trans('dataRequestDetail.label.claim')}
                    </Button>
                )}

                {payout && (
                    <span>
                        {trans('dataRequestDetail.label.claimed', {
                            payout: formatToken(payout),
                        })}
                    </span>
                )}
            </div>
        </header>
    );
}
