import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../../containers/Menu';
import { loadLoggedInAccount, loginAccount, logoutAccount } from '../../redux/account/accountActions';
import { loadAppConfig } from '../../redux/appconfig/appconfigActions';
import { setStorageManagerDialogOpen } from '../../redux/dialogs/dialogs';
import { Reducers } from '../../redux/reducers';


export default function MenuConnector() {
    const dispatch = useDispatch();
    const account = useSelector((store: Reducers) => store.account.account);
    const appConfig = useSelector((store: Reducers) => store.appconfig.appConfig);

    const handleLoginClick = useCallback(() => {
        dispatch(loginAccount());
    }, [dispatch]);

    const handleLogoutClick = useCallback(() => {
        dispatch(logoutAccount());
    }, [dispatch]);

    const handleStorageManagerClick = useCallback(() => {
        dispatch(setStorageManagerDialogOpen({
            open: true,
        }));
    }, [dispatch]);

    useEffect(() => {
        dispatch(loadLoggedInAccount());
        dispatch(loadAppConfig());
    }, [dispatch]);

    return (
        <Menu
            onLoginClick={handleLoginClick}
            account={account}
            appConfig={appConfig}
            onLogoutClick={handleLogoutClick}
            onStorageManagerClick={handleStorageManagerClick}
        />
    );
}
