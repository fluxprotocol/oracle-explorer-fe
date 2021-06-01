import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Card from '../../components/Card';
import InformationRows from '../InformationRows';
import trans from '../../translation/trans';
import { Account, AccountInfo } from '../../models/Account';

import s from './AccountDetailsInfoCard.module.scss';
import { formatToken } from '../../utils/tokenUtils';

export interface Props {
    account?: Account;
    accountInfo: AccountInfo;
}

export default function AccountDetailsInfoCard({
    account,
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
                            value: <span>{formatToken(account?.balance ?? '0')} {trans('global.token.symbol')}</span>,
                        },
                        {
                            label: trans('accountDetailsInfoCard.label.provider'),
                            value: <span>{account?.providerId}</span>,
                        },
                        {
                            label: trans('accountDetailsInfoCard.label.activeStaking'),
                            value: <span>{formatToken(accountInfo.activeStaking)} {trans('global.token.symbol')}</span>,
                        },
                        {
                            label: trans('accountDetailsInfoCard.label.totalStaked'),
                            value: <span>{formatToken(accountInfo.totalStaked)} {trans('global.token.symbol')}</span>,
                        },
                        {
                            label: trans('accountDetailsInfoCard.label.totalClaimed'),
                            value: <span>{formatToken(accountInfo.totalClaimed)} {trans('global.token.symbol')}</span>,
                        }
                    ]}
                />
            </CardContent>
        </Card>
    );
}
