import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

import { DataRequestViewModel } from '../../models/DataRequest';
import trans from '../../translation/trans';
import { routePaths } from '../../routes';

import s from './DataRequestsOverview.module.scss';

interface Props {
    dataRequests: DataRequestViewModel[];
}

export default function DataRequestsOverview({
    dataRequests,
}: Props) {
    return (
        <TableContainer className={s.container} component={Paper}>
            <Table className={s.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>{trans('dataRequestsOverview.table.label.id')}</TableCell>
                        <TableCell>{trans('dataRequestsOverview.table.label.status')}</TableCell>
                        <TableCell>{trans('dataRequestsOverview.table.label.timestamp')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataRequests.map((request) => (
                        <TableRow key={request.id}>
                            <TableCell>
                                <Link to={routePaths.dataRequestDetail(request.id)}>
                                    #{request.id}
                                </Link>
                            </TableCell>
                            <TableCell>
                                {request.id}
                            </TableCell>
                            <TableCell>
                                {request.id}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
