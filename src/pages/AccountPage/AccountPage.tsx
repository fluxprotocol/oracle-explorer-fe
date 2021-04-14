import CardContent from '@material-ui/core/CardContent';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useHistory, useLocation, useParams } from 'react-router';
import Card from '../../components/Card';
import TabBar from '../../compositions/TabBar';
import { TabBarItem } from '../../compositions/TabBar/TabBar';
import AccountDetailsInfoCardConnector from '../../connectors/AccountDetailsInfoCardConnector';
import Page from '../../containers/Page';
import { loadAccount } from '../../redux/account/accountActions';
import { routePaths } from '../../routes';
import trans from '../../translation/trans';
import AccountStakesPage from './sub-pages/AccountStakesPage';
import AccountTransactionsPage from './sub-pages/AccountTransactionsPage';

import s from './AccountPage.module.scss';
import AccountUnclaimedPage from './sub-pages/AccountUnclaimedPage';

interface Params {
    provider: string;
    accountId: string;
}

export default function AccountPage() {
    const params = useParams<Params>();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        dispatch(loadAccount(params.provider, params.accountId));
    }, [dispatch, params]);

    const onTabClick = useCallback((item: TabBarItem) => {
        history.push(item.id);
    }, [history]);

    return (
        <Page>
            <div>
                <h1>{params.accountId}</h1>
            </div>
            <AccountDetailsInfoCardConnector />
            <Card>
                <CardContent>
                    <TabBar
                        activeId={location.pathname}
                        className={s.tabBar}
                        onTabClick={onTabClick}
                        items={[{
                            id: routePaths.account(params.provider, params.accountId),
                            label: trans('accountPage.label.stakes'),
                            show: true,
                        }, {
                            id: routePaths.accountUnclaimed(params.provider, params.accountId),
                            label: trans('accountPage.label.unclaimed'),
                            show: true,
                        }]}
                    />
                    <Switch>
                        <Route exact path={routePaths.account()} component={AccountStakesPage} />
                        <Route exact path={routePaths.accountTransactions()} component={AccountTransactionsPage} />
                        <Route exact path={routePaths.accountUnclaimed()} component={AccountUnclaimedPage} />
                    </Switch>
                </CardContent>
            </Card>
        </Page>
    );
}
