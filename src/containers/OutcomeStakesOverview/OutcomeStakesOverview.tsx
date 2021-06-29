import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import { OutcomeStake } from '../../models/OutcomeStake';

import s from './OutcomeStakesOverview.module.scss';
import { DEFAULT_PAGINATION_LIMIT } from '../../config';
import trans from '../../translation/trans';
import { routePaths } from '../../routes';
import { transfromOutcomeToString } from '../../models/DataRequestOutcome';
import { formatToken } from '../../utils/tokenUtils';

interface Props {
    outcomeStakes: OutcomeStake[];
    page: number;
    totalItems: number;
    onRequestPageChange: (page: number) => void;
    showPagination?: boolean;
}

export default function OutcomeStakesOverview({
    onRequestPageChange,
    outcomeStakes = [],
    page,
    totalItems,
    showPagination = true,
}: Props) {
    return (
        <div>
            <TableContainer className={s.container} component={Paper}>
                <Table className={s.table}>
                    <TableHead className={s.tableHead}>
                        <TableRow>
                            <TableCell>{trans('outcomeStakesOverview.table.label.id')}</TableCell>
                            <TableCell>{trans('outcomeStakesOverview.table.label.roud')}</TableCell>
                            <TableCell>{trans('outcomeStakesOverview.table.label.outcome')}</TableCell>
                            <TableCell>{trans('outcomeStakesOverview.table.label.finalizedOutcome')}</TableCell>
                            <TableCell>{trans('outcomeStakesOverview.table.label.stake')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {outcomeStakes.map((stake) => (
                            <TableRow key={`${stake.dataRequestId}_${stake.round}_${transfromOutcomeToString(stake.outcome)}`}>
                                <TableCell className={s.linkCell}>
                                    <Link to={routePaths.dataRequestDetail('near', stake.dataRequestId)}>
                                        #{stake.dataRequestId}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {stake.round}
                                </TableCell>
                                <TableCell>
                                    {transfromOutcomeToString(stake.outcome)}
                                </TableCell>
                                <TableCell>
                                    {stake.finalizedOutcome ? transfromOutcomeToString(stake.finalizedOutcome) : null}
                                </TableCell>
                                <TableCell>
                                    {formatToken(stake.stake, stake.stakeToken.decimals)} {stake.stakeToken.symbol}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {showPagination && (
                <Pagination
                    className={s.pagination}
                    total={Math.ceil(totalItems / DEFAULT_PAGINATION_LIMIT) - 1}
                    page={page}
                    rowsPerPage={DEFAULT_PAGINATION_LIMIT}
                    onChangePage={onRequestPageChange}
                />
            )}
        </div>
    );
}
