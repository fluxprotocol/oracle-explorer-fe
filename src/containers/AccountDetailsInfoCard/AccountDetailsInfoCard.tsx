import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Card from '../../components/Card';
import InformationRows from '../InformationRows';
import trans from '../../translation/trans';
import { Account, AccountInfo } from '../../models/Account';

import s from './AccountDetailsInfoCard.module.scss';
import { formatToken } from '../../utils/tokenUtils';
import { AppConfig } from '../../models/AppConfig';

export interface Props {
    account?: Account;
    appConfig: AppConfig;
    accountInfo: AccountInfo;
}

export default function AccountDetailsInfoCard({
    account,
    appConfig,
    accountInfo,
}: Props) {
    return (
        <Card className={s.card}>
            <CardContent>
                <div className={s.titleWrapper}>
                    <h2 className={s.title}>{trans('accountDetailsInfoCard.title')}</h2>
                </div>
                <InformationRows
                    rows={[
                        {
                            label: trans('accountDetailsInfoCard.label.balance'),
                            value: <span>{formatToken(account?.balance ?? '0', appConfig.stakeTokenDecimals)} {appConfig.stakeTokenSymbol}</span>,
                        },
                        {
                            label: trans('accountDetailsInfoCard.label.totalStaked'),
                            value: <span>{formatToken(accountInfo.totalStaked, appConfig.stakeTokenDecimals)} {appConfig.stakeTokenSymbol}</span>,
                        },
                        {
                            label: trans('accountDetailsInfoCard.label.totalClaimed'),
                            value: <span>{formatToken(accountInfo.totalClaimed, appConfig.stakeTokenDecimals)} {appConfig.stakeTokenSymbol}</span>,
                        },
                        {
                            label: trans('accountDetailsInfoCard.label.totalDisputes'),
                            value: <span>{accountInfo.totalDisputes}</span>,
                        },
                        {
                            label: trans('accountDetailsInfoCard.label.timesSlashed'),
                            value: <span>{accountInfo.timesSlashed}</span>,
                        },
                        {
                            label: trans('accountDetailsInfoCard.label.totalSlashed'),
                            value: <span>{ formatToken(accountInfo.totalSlashed, appConfig.stakeTokenDecimals)} {appConfig.stakeTokenSymbol}</span>,
                        },
                        {
                            label: trans('accountDetailsInfoCard.label.storageUsed'),
                            info: trans('accountDetailsInfoCard.info.storageUsed', { nativeToken: appConfig.nativeTokenSymbol }),
                            value: <span>{formatToken(accountInfo.storageUsed, appConfig.nativeTokenDecimals, 4)} {appConfig.nativeTokenSymbol}</span>,
                        },
                        {
                            label: trans('accountDetailsInfoCard.label.storageUnused'),
                            info: trans('accountDetailsInfoCard.info.storageUnused', { nativeToken: appConfig.nativeTokenSymbol }),
                            value: <span>{formatToken(accountInfo.storageAvailable, appConfig.nativeTokenDecimals, 4)} {appConfig.nativeTokenSymbol}</span>,
                        },
                    ]}
                />
            </CardContent>
        </Card>
    );
}
