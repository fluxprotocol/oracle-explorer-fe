import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import FakeLinkButton from '../../components/FakeLinkButton';
import SearchConnector from '../../connectors/SearchConnector';
import { Account } from '../../models/Account';
import { routePaths, routes } from '../../routes';
import trans from '../../translation/trans';
import { formatToken } from '../../utils/tokenUtils';

import s from './Menu.module.scss';

interface Props {
    account?: Account;
    onLoginClick: () => void;
    onLogoutClick: () => void;
}

export default function Menu({
    account,
    onLoginClick,
    onLogoutClick
}: Props) {
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
                        <SearchConnector />
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
                                    <Link className={s.link} to={routePaths.account(account.providerId, account.accountId)}>{account.accountId}</Link>
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
