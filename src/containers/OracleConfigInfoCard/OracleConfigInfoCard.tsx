import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import Card from '../../components/Card';
import trans from '../../translation/trans';

import s from './OracleConfigInfoCard.module.scss';
import InformationRows from '../InformationRows';
import { OracleConfig } from '../../models/OracleConfig';
import { prettyFormatDate } from '../../utils/dateUtils';
import { formatToken } from '../../utils/tokenUtils';

interface Props {
    oracleConfig: OracleConfig;
}

export default function OracleConfigInfoCard({
    oracleConfig,
}: Props) {
    console.log('[] oracleConfig -> ', oracleConfig);
    return (
        <Card>
            <CardContent>
                <div className={s.titleWrapper}>
                    <h2 className={s.title}>{trans('oracleConfigInfoCard.title')}</h2>
                </div>
                <InformationRows
                    rows={[{
                        label: trans('oracleConfigInfoCard.label.createdAt'),
                        value: <span>{prettyFormatDate(oracleConfig.date)}</span>
                    }, {
                        label: trans('oracleConfigInfoCard.label.gov'),
                        value: <span>{oracleConfig.gov}</span>
                    }, {
                        label: trans('oracleConfigInfoCard.label.bondToken'),
                        value: <span>{oracleConfig.bondToken}</span>
                    }, {
                        label: trans('oracleConfigInfoCard.label.stakeToken'),
                        value: <span>{oracleConfig.stakeToken}</span>
                    }, {
                        label: trans('oracleConfigInfoCard.label.finalArbitrator'),
                        value: <span>{oracleConfig.finalArbitrator}</span>
                    }, {
                        label: trans('oracleConfigInfoCard.label.finalArbitratorInvokeAmount'),
                        value: <span>{formatToken(oracleConfig.finalArbitratorInvokeAmount, 18, 2)} FLX</span>
                    }, {
                        label: trans('oracleConfigInfoCard.label.resolutionFeePercentage'),
                        value: <span>{oracleConfig.resolutionFeePercentage / 100}%</span>
                    }, {
                        label: trans('oracleConfigInfoCard.label.maxOutcomes'),
                        value: <span>{oracleConfig.maxOutcomes}</span>
                    }, {
                        label: trans('oracleConfigInfoCard.label.minInitialChallengeWindowDuration'),
                        value: <span>{oracleConfig.minInitialChallengeWindowDuration} ns</span>
                    }, {
                        label: trans('oracleConfigInfoCard.label.defaultChallengeWindowDuration'),
                        value: <span>{oracleConfig.defaultChallengeWindowDuration} ns</span>
                    }]}
                />
            </CardContent>
        </Card>
    );
}
