import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import SearchInput from '../../components/SearchInput';
import { routePaths, routes } from '../../routes';
import trans from '../../translation/trans';

import s from './Menu.module.scss';

export default function Menu() {
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
                        <SearchInput label={trans('menu.label.search')} />
                    </div>
                </div>
                <ul className={s.menuItems}>
                    {routes.map(route => {
                        if (!route.inNavigation) {
                            return null;
                        }

                        return (
                            <li className={s.menuItem}>
                                <NavLink
                                    className={s.menuLink}
                                    activeClassName={s['menuLink--active']}
                                    exact
                                    to={route.path}
                                >
                                    {route.label}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </header>
    );
}
