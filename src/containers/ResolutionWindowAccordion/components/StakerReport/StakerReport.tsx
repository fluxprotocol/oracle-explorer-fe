import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { ResolutionWindow } from '../../../../models/ResolutionWindow';
import trans from '../../../../translation/trans';
import { formatToken } from '../../../../utils/tokenUtils';

import s from './StakerReport.module.scss';
import { OutcomeType } from '../../../../models/DataRequestOutcome';
import { Link } from 'react-router-dom';
import { routePaths } from '../../../../routes';

export interface Props {
    userStakes: ResolutionWindow['userStakes'];
}

export default function StakerReport({
    userStakes
}: Props) {
    return (
        <div className={s.stakerReport}>
            <TableContainer className={s.container} component={Paper}>
                <Table className={s.table}>
                    <TableHead className={s.tableHead}>
                        <TableRow>
                            <TableCell>{trans('stakeReport.table.label.accountId')}</TableCell>
                            <TableCell>{trans('stakeReport.table.label.outcome')}</TableCell>
                            <TableCell>{trans('stakeReport.table.label.stake')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(userStakes).map((accountId, index) => {
                            const outcomeInfo = userStakes[accountId][0];

                            return (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Link className={s.link} to={routePaths.account('near', accountId)}>{accountId}</Link>
                                    </TableCell>
                                    <TableCell>
                                        {outcomeInfo.outcome.type === OutcomeType.Answer && (
                                            <span>"{outcomeInfo.outcome.answer}"</span>
                                        )}

                                        {outcomeInfo.outcome.type === OutcomeType.Invalid && (
                                            <span>{trans('stakerReport.label.invalid')}</span>
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
