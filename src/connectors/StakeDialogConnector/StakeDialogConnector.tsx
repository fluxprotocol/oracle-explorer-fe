import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StakeDialog from '../../containers/StakeDialog';
import { StakeFormValues } from '../../containers/StakeDialog/services/createDefaultStakeFormValues';
import { stakeDataRequest } from '../../redux/dataRequest/dataRequestAction';
import { setStakeDialogOpen } from '../../redux/dialogs/dialogs';
import { Reducers } from '../../redux/reducers';

export default function StakeDialogConnector() {
    const dispatch = useDispatch();
    const open = useSelector((store: Reducers) => store.dialogs.stakeDialog.open);
    const account = useSelector((store: Reducers) => store.account.account);
    const dataRequest = useSelector((store: Reducers) => store.dialogs.stakeDialog.dataRequest);

    const handleRequestClose = useCallback(() => {
        dispatch(setStakeDialogOpen({
            open: false,
            dataRequest: undefined,
        }));
    }, [dispatch]);

    const handleSubmit = useCallback((formValues: StakeFormValues) => {
        if (!dataRequest) return;

        dispatch(stakeDataRequest(dataRequest, formValues))
    }, [dispatch, dataRequest]);

    if (!account || !dataRequest) return null;

    return (
        <StakeDialog
            open={open}
            onRequestClose={handleRequestClose}
            onSubmit={handleSubmit}
            account={account}
            dataRequest={dataRequest}
        />
    );
}
