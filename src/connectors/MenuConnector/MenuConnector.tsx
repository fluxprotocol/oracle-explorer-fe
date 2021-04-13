import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '../../containers/Menu';
import { loadLoggedInAccount, loginAccount, logoutAccount } from '../../redux/account/accountActions';
import { Reducers } from '../../redux/reducers';


export default function MenuConnector() {
    const dispatch = useDispatch();
    const account = useSelector((store: Reducers) => store.account.account);


    const handleLoginClick = useCallback(() => {
        dispatch(loginAccount());
    }, [dispatch]);

    const handleLogoutClick = useCallback(() => {
        dispatch(logoutAccount());
    }, [dispatch]);

    useEffect(() => {
        dispatch(loadLoggedInAccount());
    }, [dispatch]);

    return (
        <Menu
            onLoginClick={handleLoginClick}
            account={account}
            onLogoutClick={handleLogoutClick}
        />
    );
}
