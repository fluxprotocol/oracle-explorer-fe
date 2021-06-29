import React from 'react';
import { useSelector } from 'react-redux';
import WhitelistInfoCard from '../../containers/WhitelistInfoCard';
import { Reducers } from '../../redux/reducers';


export default function WhitelistInfoCardConnector() {
    const whitelist = useSelector((store: Reducers) => store.account.accountDetail.info.whitelistItem);
    const appConfig = useSelector((store: Reducers) => store.appconfig.appConfig);

    if (!whitelist) {
        return null;
    }

    return (
        <WhitelistInfoCard
            whitelist={whitelist}
            appConfig={appConfig}
        />
    );
}
