import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataRequestDetailHeader from '../../containers/DataRequestDetailHeader';
import { claimDataRequest, finalizeDataRequest } from '../../redux/dataRequest/dataRequestAction';
import { setStakeDialogOpen, setUnstakeDialogOpen } from '../../redux/dialogs/dialogs';
import { Reducers } from '../../redux/reducers';


export default function DataRequestDetailHeaderConnector() {
    const dispatch = useDispatch();
    const dataRequest = useSelector((store: Reducers) => store.dataRequest.dataRequestDetail);
    const account = useSelector((store: Reducers) => store.account.account);
    const accountStakes = useSelector((store: Reducers) => store.dataRequest.accountStakes);

    const handleStakeClick = useCallback(() => {
        dispatch(setStakeDialogOpen({
            open: true,
            dataRequest,
        }));
    }, [dispatch, dataRequest]);

    const handleUnstakeClick = useCallback(() => {
        dispatch(setUnstakeDialogOpen({
            open: true,
            dataRequest
        }));
    }, [dispatch, dataRequest]);

    const handleFinalizeClick = useCallback(() => {
        if (!dataRequest) return;
        dispatch(finalizeDataRequest(dataRequest));
    }, [dispatch, dataRequest]);

    const handleClaimClick = useCallback(() => {
        if (!dataRequest || !account) return;
        dispatch(claimDataRequest(account.accountId, dataRequest));
    }, [dispatch, dataRequest, account]);

    if (!dataRequest) return null;

    return (
        <DataRequestDetailHeader
            dataRequest={dataRequest}
            onStakeClick={handleStakeClick}
            onFinalizeClick={handleFinalizeClick}
            onClaimClick={handleClaimClick}
            onUnstakeClick={handleUnstakeClick}
            account={account}
            accountStakes={accountStakes}
        />
    );
}
