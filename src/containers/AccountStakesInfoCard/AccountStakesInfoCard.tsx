import React, { PropsWithChildren } from 'react';
import CardContent from '@material-ui/core/CardContent';

import Card from '../../components/Card';
import { OutcomeStake } from '../../models/OutcomeStake';
import trans from '../../translation/trans';
import OutcomeStakeInfo from '../ResolutionWindowAccordion/components/OutcomeStakeInfo/OutcomeStakeInfo';

import s from './AccountStakesInfoCard.module.scss';
import { ClaimViewModel } from '../../models/Claim';
import { formatToken } from '../../utils/tokenUtils';
import { Outcome } from '../../models/DataRequestOutcome';
import { TokenViewModel } from '../../models/Token';

interface Props {
    claim?: ClaimViewModel;
    accountStakes: OutcomeStake[];
    finalizedOutcome?: Outcome;
    finalizedRound?: number;
    stakeToken: TokenViewModel;
}

function EmptyDiv(props: PropsWithChildren<{}>) {
    return <div>{props.children}</div>
}

export default function AccountStakesInfoCard({
    claim,
    accountStakes,
    finalizedRound,
    finalizedOutcome,
    stakeToken,
}: Props) {
    return (
        <Card className={s.card}>
            <CardContent>
                <div className={s.titleWrapper}>
                    <h2 className={s.title}>{trans('accountStakesInfoCard.title')}</h2>
                </div>

                {claim && (
                    <div className={s.claim}>
                        {trans('dataRequestDetail.label.claimed', {
                            payout: formatToken(claim.payout, stakeToken.decimals),
                            userCorrectStake: formatToken(claim.userCorrectStake, stakeToken.decimals),
                            tokenSymbol: stakeToken.symbol,
                        })}
                    </div>
                )}

                {accountStakes.length > 0 && (
                    <OutcomeStakeInfo
                        outcomeStakes={accountStakes}
                        tableComponent={EmptyDiv}
                        finalizedOutcome={finalizedOutcome}
                        finalizedRound={finalizedRound}
                        stakeToken={stakeToken}
                    />
                )}

                {accountStakes.length === 0 && (
                    <div className={s.noStakes}>
                        {trans('accountStakesInfoCard.noStakes')}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
