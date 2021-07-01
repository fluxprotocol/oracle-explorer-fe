import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { OutcomeStake } from '../../../../models/OutcomeStake';

import s from './OutcomeStakeInfo.module.scss';
import trans from '../../../../translation/trans';
import { formatToken } from '../../../../utils/tokenUtils';
import { isSameOutcome, Outcome, OutcomeType } from '../../../../models/DataRequestOutcome';
import { TokenViewModel } from '../../../../models/Token';
import Big from 'big.js';

export interface Props {
    outcomeStakes: OutcomeStake[];
    tableComponent?: any;
    finalizedOutcome?: Outcome;
    finalizedRound?: number;
    stakeToken: TokenViewModel;
}

export default function OutcomeStakeInfo({
    outcomeStakes,
    tableComponent = Paper,
    finalizedOutcome,
    finalizedRound,
    stakeToken,
}: Props) {
    return (
        <div>
            <TableContainer className={s.container} component={tableComponent}>
                <Table className={s.table}>
                    <TableHead className={s.tableHead}>
                        <TableRow>
                            <TableCell>{trans('outcomeStakeInfo.table.label.outcome')}</TableCell>
                            <TableCell>{trans('outcomeStakeInfo.table.label.stake')}</TableCell>
                            {finalizedOutcome && <TableCell>{trans('outcomeStakeInfo.table.label.correcltyStaked')}</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {outcomeStakes.map((outcomeInfo, index) => {
                            if (new Big(outcomeInfo.stake).lte(0)) {
                                return null;
                            }

                            return (
                                <TableRow key={index}>
                                    <TableCell>
                                        {outcomeInfo.outcome.type === OutcomeType.Answer && (
                                            <span>"{outcomeInfo.outcome.answer}"</span>
                                        )}

                                        {outcomeInfo.outcome.type === OutcomeType.Invalid && (
                                            <span>{trans('outcomeStakeInfo.label.invalid')}</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {formatToken(outcomeInfo.stake, stakeToken.decimals)} {stakeToken.symbol}
                                    </TableCell>

                                    {finalizedOutcome && typeof finalizedRound !== 'undefined' && (
                                        <TableCell>
                                            {outcomeInfo.round <= finalizedRound && isSameOutcome(finalizedOutcome, outcomeInfo.outcome) && trans('outcomeStakeInfo.label.correct')}
                                            {outcomeInfo.round <= finalizedRound && !isSameOutcome(finalizedOutcome, outcomeInfo.outcome) && trans('outcomeStakeInfo.label.incorrect')}
                                            {outcomeInfo.round > finalizedRound && trans('outcomeStakeInfo.label.unbonded')}
                                        </TableCell>
                                    )}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
