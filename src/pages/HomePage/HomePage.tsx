import React from 'react';
import HomeHeaderConnector from '../../connectors/HomeHeaderConnector';

import Page from '../../containers/Page';


export default function HomePage() {
    return (
        <Page>
            <HomeHeaderConnector />
            total requests amount, latest 5 requests, latest stake by account,
            TVS? Price token, market cap
        </Page>
    );
}
