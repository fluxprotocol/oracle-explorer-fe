import React from 'react';
import { useParams } from 'react-router';

import Page from '../../containers/Page';
import trans from '../../translation/trans';

import s from './SearchResultPage.module.scss';

interface Params {
    query: string;
}

export default function SearchResultPage() {
    const params = useParams<Params>();

    return (
        <Page>
            <div>
                <h1 className={s.title}>{trans('searchResultPage.title', { query: params.query })}</h1>
            </div>
            <div>
                {trans('searchResultPage.noResults')}
            </div>
        </Page>
    );
}
