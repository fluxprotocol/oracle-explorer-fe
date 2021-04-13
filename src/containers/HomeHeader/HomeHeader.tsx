import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Card from '../../components/Card';
import SearchConnector from '../../connectors/SearchConnector';
import trans from '../../translation/trans';

import s from './HomeHeader.module.scss';

export default function HomeHeader() {
    return (
        <Card>
            <CardContent>
                <h1 className={s.title}>{trans('homeHeader.title')}</h1>
                <SearchConnector inputClassName={s.searchInput} className={s.search} />
            </CardContent>
        </Card>
    );
}
