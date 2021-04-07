import React, { FormEvent, useCallback, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import FakeLinkButton from '../../components/FakeLinkButton';
import SearchInput from '../../components/SearchInput';
import { Account } from '../../models/Account';
import { routePaths, routes } from '../../routes';
import trans from '../../translation/trans';
import { formatToken } from '../../utils/tokenUtils';

import s from './Menu.module.scss';

interface Props {
    account?: Account;
    onSearch: (query: string) => void;
    onLoginClick: () => void;
    onLogoutClick: () => void;
}

export default function Menu({
    account,
    onSearch,
    onLoginClick,
    onLogoutClick
}: Props) {
    const [query, setQuery] = useState('');
    const handleSearchSubmit = useCallback((event: FormEvent) => {
        event.preventDefault();
        onSearch(query);
    }, [query, onSearch]);

    return (
        <header className={s.root}>
            <div className={s.menu}>
                <div className={s.topBar}>
                    <div>
                        <Link to={routePaths.root()} className={s.logoWrapper}>
                            <div className={s.logo} />
                        </Link>
                    </div>
                    <div>
                        <form onSubmit={handleSearchSubmit}>
                            <SearchInput
                                label={trans('menu.label.search')}
                                onChange={v => setQuery(v)}
                                value={query}
                            />
                            <input type="submit" hidden />
                        </form>
                    </div>
                </div>
                <div className={s.bottomBar}>
                    <ul className={s.menuItems}>
                        {routes.map(route => {
                            if (!route.inNavigation) {
                                return null;
                            }

                            return (
                                <li className={s.menuItem} key={route.key}>
                                    <NavLink
                                        className={s.menuLink}
                                        activeClassName={s['menuLink--active']}
                                        exact
                                        to={route.navPath}
                                    >
                                        {route.label}
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                    <ul className={s.accountLinks}>
                        {!account && (
                            <li>
                                <FakeLinkButton onClick={onLoginClick}>
                                    {trans('menu.label.login')}
                                </FakeLinkButton>
                            </li>
                        )}

                        {account && (
                            <>
                                <li className={s.menuItem}>
                                    {account.accountId}
                                </li>
                                <li className={s.menuItem}>
                                    {formatToken(account.balance)} FLX
                                </li>
                                <li className={s.menuItem}>
                                    <FakeLinkButton onClick={onLogoutClick}>
                                        {trans('menu.label.logout')}
                                    </FakeLinkButton>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
}
