import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import OutcomeStakesOverview from '../../containers/OutcomeStakesOverview';
import { loadAccountStakes } from '../../redux/account/accountActions';
import { Reducers } from '../../redux/reducers';


interface Params {
    provider: string;
    accountId: string;
}

export default function AccountOutcomeStakesConnector() {
    const dispatch = useDispatch();
    const params = useParams<Params>();
    const stakes = useSelector((store: Reducers) => store.account.accountDetail.accountStakes);
    const total = useSelector((store: Reducers) => store.account.accountDetail.accountStakesTotal);
    const [page, setPage] = useState(0);

    const handleRequestPageChange = useCallback((newPage: number) => {
        dispatch(loadAccountStakes(newPage, params.accountId, false));
        setPage(newPage);
    }, [dispatch, params]);

    return (
        <OutcomeStakesOverview
            onRequestPageChange={handleRequestPageChange}
            outcomeStakes={stakes}
            totalItems={total}
            page={page}
        />
    );
}
