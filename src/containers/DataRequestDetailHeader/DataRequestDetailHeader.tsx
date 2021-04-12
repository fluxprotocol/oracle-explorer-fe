import React from 'react';
import Button from '../../components/Button';
import { Account } from '../../models/Account';
import { DataRequestViewModel } from '../../models/DataRequest';
import { OutcomeStake } from '../../models/OutcomeStake';
import { ResolutionWindow } from '../../models/ResolutionWindow';
import trans from '../../translation/trans';

import s from './DataRequestDetailHeader.module.scss';

interface Props {
    dataRequest: DataRequestViewModel;
    onStakeClick: () => void;
    onClaimClick: () => void;
    onFinalizeClick: () => void;
    account?: Account;
    accountStakes: OutcomeStake[];
}

export default function DataRequestDetailHeader({
    dataRequest,
    onStakeClick,
    onClaimClick,
    onFinalizeClick,
    account,
    accountStakes,
}: Props) {
    const currentResolutionWindow: ResolutionWindow | undefined = dataRequest.resolutionWindows[dataRequest.resolutionWindows.length - 1] ?? undefined;
    const now = new Date().getTime();
    const isFinalized = typeof dataRequest.finalized_outcome !== 'undefined';
    const canFinalize = currentResolutionWindow?.endTime.getTime() <= now && !isFinalized;

    return (
        <header className={s.header}>
            <h1>{trans('dataRequestDetail.title', { id: dataRequest.id })}</h1>
            <div>
                {account && !isFinalized && (
                    <Button className={s.button} onClick={onStakeClick}>
                        {trans('dataRequestDetail.label.stake')}
                    </Button>
                )}

                {account && canFinalize && (
                    <Button className={s.button} onClick={onFinalizeClick}>
                        {trans('dataRequestDetail.label.finalize')}
                    </Button>
                )}

                {account && accountStakes.length > 0 && isFinalized && (
                    <Button className={s.button} onClick={onClaimClick}>
                        {trans('dataRequestDetail.label.claim')}
                    </Button>
                )}
            </div>
        </header>
    );
}
