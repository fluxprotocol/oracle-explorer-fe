import React, { PropsWithChildren } from 'react';
import CardContent from '@material-ui/core/CardContent';

import Card from '../../components/Card';
import { OutcomeStake } from '../../models/OutcomeStake';
import trans from '../../translation/trans';
import OutcomeStakeInfo from '../ResolutionWindowAccordion/components/OutcomeStakeInfo/OutcomeStakeInfo';

import s from './AccountStakesInfoCard.module.scss';

interface Props {
    accountStakes: OutcomeStake[];
}

function EmptyDiv(props: PropsWithChildren<{}>) {
    return <div>{props.children}</div>
}

export default function AccountStakesInfoCard({
    accountStakes,
}: Props) {
    return (
        <Card className={s.card}>
            <CardContent>
                <div className={s.titleWrapper}>
                    <h2 className={s.title}>{trans('accountStakesInfoCard.title')}</h2>
                </div>

                {accountStakes.length > 0 && (
                    <OutcomeStakeInfo
                        outcomeStakes={accountStakes}
                        tableComponent={EmptyDiv}
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
