import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import DataRequestsOverview from '../../containers/DataRequestsOverview';
import { loadAccountRequests } from '../../redux/account/accountActions';
import { Reducers } from '../../redux/reducers';

interface Params {
    provider: string;
    accountId: string;
}

export default function AccountRequestsConnector() {
    const [page, setPage] = useState(0);
    const dispatch = useDispatch();
    const params = useParams<Params>();
    const dataRequests = useSelector((store: Reducers) => store.account.accountDetail.accountRequests);
    const dataRequestsTotal = useSelector((store: Reducers) => store.account.accountDetail.accountRequestsTotal);

    const handleRequestPageChange = useCallback((newPage: number) => {
        dispatch(loadAccountRequests(newPage, params.accountId));
        setPage(newPage);
    }, [dispatch, params]);

    return (
        <DataRequestsOverview
            dataRequests={dataRequests}
            onRequestPageChange={handleRequestPageChange}
            page={page}
            totalItems={dataRequestsTotal}
            showPagination
        />
    );
}
