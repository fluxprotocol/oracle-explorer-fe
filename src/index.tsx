import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider } from '@material-ui/core/styles';

import { routes } from './routes';
import configureStore from './redux/store';

import './styles/global.module.scss';

const store = configureStore({});

ReactDOM.render(
    <Provider store={store}>
        <HashRouter basename="/" hashType="hashbang">
            <StylesProvider injectFirst>
                <Switch>
                    {routes.map(route => <Route {...route} key={route.key} />)}
                </Switch>
            </StylesProvider>
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);
