import { ComponentType } from 'react';
import AccountPage from './pages/AccountPage';
import ConfigPage from './pages/ConfigPage';
import DataRequestDetailPage from './pages/DataRequestDetailPage';
import DataRequestsPage from './pages/DataRequestsPage';
import HomePage from './pages/HomePage';
import SearchResultPage from './pages/SearchResultPage';
import trans from './translation/trans';

interface RouteProps {
    component: ComponentType;
    exact: boolean;
    path: string;
    navPath: string;
    inNavigation: boolean;
    key: string;
    label: string;
    icon?: string;
}

export const routePaths = {
    root: () => '/',
    account: (provider = ':provider', accountId = ':accountId') => `/account/${provider}/${accountId}`,
    accountTransactions: (provider = ':provider', accountId = ':accountId') => `/account/${provider}/${accountId}/transactions`,
    accountUnclaimed: (provider = ':provider', accountId = ':accountId') => `/account/${provider}/${accountId}/unclaimed`,

    config: (provider = ':provider', id = ':id') => `/config/${provider}/${id}`,

    search: (query = ':query') => `/search/${query}`,
    dataRequests: (page = ':page') => `/requests/${page}`,
    dataRequestDetail: (provider = ':provider', id = ':id') => `/request/${provider}/${id}`,
}

export const routes: RouteProps[] = [
    {
        component: HomePage,
        exact: true,
        inNavigation: true,
        key: 'home',
        label: trans('routes.label.home'),
        path: routePaths.root(),
        navPath: routePaths.root(),
    },
    {
        component: SearchResultPage,
        exact: true,
        inNavigation: false,
        key: 'search',
        label: trans('routes.label.search'),
        path: routePaths.search(),
        navPath: routePaths.search(),
    },
    {
        component: AccountPage,
        exact: false,
        inNavigation: false,
        key: 'account',
        label: trans('routes.label.account'),
        path: routePaths.account(),
        navPath: routePaths.account(),
    },
    {
        component: DataRequestDetailPage,
        exact: false,
        inNavigation: false,
        key: 'data-request-detail',
        label: 'Data request detail',
        path: routePaths.dataRequestDetail(),
        navPath: routePaths.dataRequestDetail(),
    },
    {
        component: DataRequestsPage,
        exact: true,
        inNavigation: true,
        key: 'data-requests',
        label: trans('routes.label.dataRequests'),
        path: routePaths.dataRequests(),
        navPath: routePaths.dataRequests('0'),
    },
    {
        component: ConfigPage,
        exact: true,
        inNavigation: false,
        key: 'config-detail',
        label: trans('routes.label.config'),
        path: routePaths.config(),
        navPath: routePaths.config(),
    },
];
