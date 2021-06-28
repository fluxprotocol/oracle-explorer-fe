import React from 'react';
import { useSelector } from 'react-redux';
import WhitelistInfoCard from '../../containers/WhitelistInfoCard';
import { Reducers } from '../../redux/reducers';


export default function WhitelistInfoCardConnector() {
    const whitelist = useSelector((store: Reducers) => store.account.accountDetail.info.whitelistItem);

    if (!whitelist) {
        return null;
    }

    return (
        <WhitelistInfoCard whitelist={whitelist} />
    );
}
