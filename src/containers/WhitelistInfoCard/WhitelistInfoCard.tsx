import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Card from '../../components/Card';

import s from './WhitelistInfoCard.module.scss';
import trans, { booleanToYesNo } from '../../translation/trans';
import InformationRows from '../InformationRows';
import { WhitelistItemViewModel } from '../../models/WhitelistItem';
import { InformationRow } from '../InformationRows/InformationRows';
import { formatToken } from '../../utils/tokenUtils';
import ExternalLink from '../../components/ExternalLink';
import { AppConfig } from '../../models/AppConfig';

interface Props {
    whitelist: WhitelistItemViewModel;
    appConfig: AppConfig;
}

export default function WhitelistInfoCard({
    whitelist,
    appConfig,
}: Props) {
    const rows: InformationRow[] = [
        {
            label: trans('whitelistInfoCard.label.interfaceName'),
            value: <span>{whitelist.interfaceName}</span>,
        },
        {
            label: trans('whitelistInfoCard.label.codeBaseUrl'),
            value: <ExternalLink href={whitelist.codeBaseUrl}>{whitelist.codeBaseUrl}</ExternalLink>,
        },
        {
            label: trans('whitelistInfoCard.label.active'),
            value: <span>{booleanToYesNo(whitelist.active)}</span>,
        }
    ];

    if (whitelist.customFee) {
        if (whitelist.customFee.type === 'fixed') {
            rows.push({
                label: trans('whitelistInfoCard.label.fixedFee'),
                value: <span>{formatToken(whitelist.customFee.fee, appConfig.stakeTokenDecimals)} {appConfig.stakeTokenSymbol}</span>
            });
        } else if (whitelist.customFee.type === 'multiplier') {
            rows.push({
                label: trans('whitelistInfoCard.label.stakeMultiplier'),
                value: <span>{whitelist.customFee.multiplier}x</span>
            });
        }
    }

    return (
        <Card className={s.card}>
            <CardContent>
                <div className={s.titleWrapper}>
                    <h2 className={s.title}>{trans('whitelistInfoCard.title')}</h2>
                </div>
                <InformationRows
                    rows={rows}
                />
            </CardContent>
        </Card>
    );
}
