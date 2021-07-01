import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UnstakeDialog from '../../containers/UnstakeDialog';
import { UnstakeFormValues } from '../../containers/UnstakeDialog/services/createDefaultUnstakeFormValues';
import { unstakeDataRequest } from '../../redux/dataRequest/dataRequestAction';
import { setUnstakeDialogOpen } from '../../redux/dialogs/dialogs';
import { Reducers } from '../../redux/reducers';


export default function UnstakeDialogConnector() {
    const dispatch = useDispatch();
    const open = useSelector((store: Reducers) => store.dialogs.unstakeDialog.open);
    // const accountStakes = useSelector((store: Reducers) => store.dataRequest.accountStakes);
    const dataRequest = useSelector((store: Reducers) => store.dialogs.unstakeDialog.dataRequest);

    const handleRequestClose = useCallback(() => {
        dispatch(setUnstakeDialogOpen({
            open: false,
            dataRequest: undefined,
        }));
    }, [dispatch]);

    const handleSubmit = useCallback((formValues: UnstakeFormValues) => {
        if (!dataRequest || !formValues.selectedStakedOutcome) return;

        dispatch(unstakeDataRequest(formValues.amount, dataRequest, formValues.selectedStakedOutcome));
    }, [dispatch, dataRequest]);

    if (!dataRequest) return null;

    return (
        <UnstakeDialog
            onRequestClose={handleRequestClose}
            open={open}
            dataRequest={dataRequest}
            onSubmit={handleSubmit}
        />
    );
}
