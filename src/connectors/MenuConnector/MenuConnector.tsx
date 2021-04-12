import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Menu from '../../containers/Menu';
import { loadAccount, loginAccount, logoutAccount } from '../../redux/account/accountActions';
import { Reducers } from '../../redux/reducers';
import { routePaths } from '../../routes';
import { search } from '../../services/SearchService';


export default function MenuConnector() {
    const dispatch = useDispatch();
    const history = useHistory();
    const account = useSelector((store: Reducers) => store.account.account);

    const handleSearch = useCallback(async (query) => {
        const result = await search(query);

        if (result.total === 0) {
            history.push(routePaths.search(query));
            return;
        }

        history.push(result.items[0].url);
    }, [history]);

    const handleLoginClick = useCallback(() => {
        dispatch(loginAccount());
    }, [dispatch]);

    const handleLogoutClick = useCallback(() => {
        dispatch(logoutAccount());
    }, [dispatch]);

    useEffect(() => {
        dispatch(loadAccount());
    }, [dispatch]);

    return (
        <Menu
            onSearch={handleSearch}
            onLoginClick={handleLoginClick}
            account={account}
            onLogoutClick={handleLogoutClick}
        />
    );
}
