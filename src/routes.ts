import { ComponentType } from 'react';
import DataRequestDetailPage from './pages/DataRequestDetailPage';
import DataRequestsPage from './pages/DataRequestsPage';
import HomePage from './pages/HomePage';
import trans from './translation/trans';

interface RouteProps {
    component: ComponentType;
    exact: boolean;
    path: string;
    inNavigation: boolean;
    key: string;
    label: string;
    icon?: string;
}

export const routePaths = {
    root: () => '/',
    dataRequests: () => '/requests',
    dataRequestDetail: (id = ':id') => `/request/${id}`,
}

export const routes: RouteProps[] = [
    {
        component: HomePage,
        exact: true,
        inNavigation: true,
        key: 'home',
        label: trans('routes.label.home'),
        path: routePaths.root(),
    },
    {
        component: DataRequestDetailPage,
        exact: false,
        inNavigation: false,
        key: 'data-request-detail',
        label: 'Data request detail',
        path: routePaths.dataRequestDetail(),
    },
    {
        component: DataRequestsPage,
        exact: false,
        inNavigation: true,
        key: 'data-requests',
        label: trans('routes.label.dataRequests'),
        path: routePaths.dataRequests(),
    },
];
