import React, { PropsWithChildren } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Card from '../../components/Card';
import trans from '../../translation/trans';

import s from './AccountStakesInfoCard.module.scss';
import { ClaimViewModel } from '../../models/Claim';
import { formatToken } from '../../utils/tokenUtils';
import { isSameOutcome, Outcome, OutcomeType } from '../../models/DataRequestOutcome';
import { TokenViewModel } from '../../models/Token';
import { UserStakeViewModel } from '../../models/UserStakes';
import Big from 'big.js';

interface Props {
    claim?: ClaimViewModel;
    accountStakes: UserStakeViewModel[];
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

                {finalizedOutcome && !claim && (
                    <div className={s.claim}>
                        {trans('dataRequestDetail.description.unclaimed')}
                    </div>
                )}

                {accountStakes.length > 0 && (
                    <TableContainer className={s.container} component={EmptyDiv}>
                        <Table className={s.table}>
                            <TableHead className={s.tableHead}>
                                <TableRow>
                                    <TableCell>{trans('outcomeStakeInfo.table.label.round')}</TableCell>
                                    <TableCell>{trans('outcomeStakeInfo.table.label.outcome')}</TableCell>
                                    <TableCell>{trans('outcomeStakeInfo.table.label.stake')}</TableCell>
                                    {finalizedOutcome && <TableCell>{trans('outcomeStakeInfo.table.label.correcltyStaked')}</TableCell>}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {accountStakes.map((stakeInfo, index) => {
                                    if (new Big(stakeInfo.totalStake).lte(0)) {
                                        return null;
                                    }

                                    return (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {stakeInfo.round}
                                            </TableCell>
                                            <TableCell>
                                                {stakeInfo.outcome.type === OutcomeType.Answer && (
                                                    <span>"{stakeInfo.outcome.answer}"</span>
                                                )}

                                                {stakeInfo.outcome.type === OutcomeType.Invalid && (
                                                    <span>{trans('outcomeStakeInfo.label.invalid')}</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {formatToken(stakeInfo.totalStake, stakeToken.decimals)} {stakeToken.symbol}
                                            </TableCell>

                                            {finalizedOutcome && typeof finalizedRound !== 'undefined' && (
                                                <TableCell>
                                                    {stakeInfo.bonded && isSameOutcome(finalizedOutcome, stakeInfo.outcome) && trans('outcomeStakeInfo.label.correct')}
                                                    {stakeInfo.bonded && !isSameOutcome(finalizedOutcome, stakeInfo.outcome) && trans('outcomeStakeInfo.label.incorrect')}
                                                    {!stakeInfo.bonded && trans('outcomeStakeInfo.label.unbonded')}
                                                </TableCell>
                                            )}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
