import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

import { DataRequestListItem, getDataRequestTypeTranslation } from '../../models/DataRequest';
import trans from '../../translation/trans';
import { routePaths } from '../../routes';
import Pagination from '../Pagination/Pagination';

import s from './DataRequestsOverview.module.scss';
import { DEFAULT_PAGINATION_LIMIT } from '../../config';
import { prettyFormatDate } from '../../utils/dateUtils';

interface Props {
    dataRequests: DataRequestListItem[];
    page: number;
    totalItems: number;
    showPagination?: boolean;
    onRequestPageChange: (page: number) => void;
}

export default function DataRequestsOverview({
    dataRequests,
    page,
    totalItems,
    showPagination = true,
    onRequestPageChange,
}: Props) {
    return (
        <div className={s.root}>
            <TableContainer className={s.container} component={Paper}>
                <Table className={s.table}>
                    <TableHead className={s.tableHead}>
                        <TableRow>
                            <TableCell>{trans('dataRequestsOverview.table.label.id')}</TableCell>
                            <TableCell>{trans('dataRequestsOverview.table.label.type')}</TableCell>
                            <TableCell>{trans('dataRequestsOverview.table.label.status')}</TableCell>
                            <TableCell>{trans('dataRequestsOverview.table.label.timestamp')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataRequests.map((request) => (
                            <TableRow key={request.id}>
                                <TableCell className={s.linkCell}>
                                    <Link to={routePaths.dataRequestDetail('near', request.id)}>
                                        #{request.id}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {getDataRequestTypeTranslation(request.type)}
                                </TableCell>
                                <TableCell>
                                    {request.finalized_outcome && (
                                        <span>{trans('global.status.completed')}</span>
                                    )}

                                    {!request.finalized_outcome && (
                                        <span>{trans('global.status.ongoing')}</span>
                                    )}
                                </TableCell>
                                <TableCell>
                                    {prettyFormatDate(request.date)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {dataRequests.length === 0 && (
                <div className={s.noRequests}>{trans('global.empty.noRequests')}</div>
            )}
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
