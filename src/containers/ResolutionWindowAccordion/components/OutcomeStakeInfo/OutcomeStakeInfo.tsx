import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { OutcomeStake } from '../../../../models/ResolutionWindow';

import s from './OutcomeStakeInfo.module.scss';
import trans from '../../../../translation/trans';
import { formatToken } from '../../../../utils/tokenUtils';
import { OutcomeType } from '../../../../models/DataRequestOutcome';

export interface Props {
    outcomeStakes: OutcomeStake[];
}

export default function OutcomeStakeInfo({
    outcomeStakes,
}: Props) {
    return (
        <div>
            <TableContainer className={s.container} component={Paper}>
                <Table className={s.table}>
                    <TableHead className={s.tableHead}>
                        <TableRow>
                            <TableCell>{trans('outcomeStakeInfo.table.label.outcome')}</TableCell>
                            <TableCell>{trans('outcomeStakeInfo.table.label.stake')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {outcomeStakes.map((outcomeInfo, index) => {
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
                                        {formatToken(outcomeInfo.stake, 18)} FLX
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
