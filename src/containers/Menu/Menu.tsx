import React, { FormEvent, useState } from 'react';
import MuiMenu from '@material-ui/core/Menu';
import MuiMenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import { NavLink, Link, useHistory } from 'react-router-dom';
import FakeLinkButton from '../../components/FakeLinkButton';
import SearchConnector from '../../connectors/SearchConnector';
import { Account } from '../../models/Account';
import { routePaths, routes } from '../../routes';
import trans from '../../translation/trans';
import { formatToken } from '../../utils/tokenUtils';

import s from './Menu.module.scss';
import StorageManagerDialogConnector from '../../connectors/StorageManagerDialogConnector';
interface Props {
    account?: Account;
    onLoginClick: () => void;
    onLogoutClick: () => void;
    onStorageManagerClick: () => void;
}

export default function Menu({
    account,
    onLoginClick,
    onLogoutClick,
    onStorageManagerClick,
}: Props) {
    const [menuAnchorEl, setMenuAnchorEl] = useState<Element | null>(null);
    const history = useHistory();

    function handleMenuClick(event: FormEvent) {
        setMenuAnchorEl(event.currentTarget);
    }

    function handleMenuClose() {
        setMenuAnchorEl(null);
    }

    function handleLogoutClick() {
        handleMenuClose();
        onLogoutClick();
    }

    function handleStorageManagerClick() {
        handleMenuClose();
        onStorageManagerClick();
    }

    function handleAccountClick() {
        if (!account) return;
        handleMenuClose();

        history.push(routePaths.account(account.providerId, account.accountId));
    }

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
                        <StorageManagerDialogConnector />
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
                    <div className={s.rightMenu}>
                        <ul className={s.accountLinks}>
                            {account && (
                                <>
                                    <li className={s.menuItem}>
                                        <Link className={s.link} to={routePaths.account(account.providerId, account.accountId)}>{account.accountId}</Link>
                                    </li>
                                    <li className={s.menuItem}>
                                        {formatToken(account.balance)} {trans('global.token.symbol')}
                                    </li>
                                </>
                            )}
                        </ul>
                        <div className={s.moreMenu}>
                            {!account && (
                                <FakeLinkButton onClick={onLoginClick}>
                                    {trans('menu.label.login')}
                                </FakeLinkButton>
                            )}

                            {account && (
                                <>
                                    <IconButton onClick={handleMenuClick} className={s.iconButton}>
                                        <MoreVertIcon />
                                    </IconButton>
                                    <MuiMenu anchorEl={menuAnchorEl} keepMounted open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
                                        <MuiMenuItem className={s.mobileOnly} onClick={handleAccountClick}>{account.accountId}</MuiMenuItem>
                                        <MuiMenuItem className={s.mobileOnly} disabled>{formatToken(account.balance)} {trans('global.token.symbol')}</MuiMenuItem>
                                        <MuiMenuItem onClick={handleStorageManagerClick}>{trans('menu.label.storageManager')}</MuiMenuItem>
                                        <MuiMenuItem onClick={handleLogoutClick}>{trans('menu.label.logout')}</MuiMenuItem>
                                    </MuiMenu>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
