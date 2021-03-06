import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import Card from '../../components/Card';
import trans from '../../translation/trans';

import s from './OracleConfigInfoCard.module.scss';
import InformationRows from '../InformationRows';
import { OracleConfig } from '../../models/OracleConfig';
import { formatTimeToReadable, prettyFormatDate } from '../../utils/dateUtils';
import { formatToken } from '../../utils/tokenUtils';
import { prettyFormatNumber } from '../../utils/prettyFormatNumber';

interface Props {
    oracleConfig: OracleConfig;
}

export default function OracleConfigInfoCard({
    oracleConfig,
}: Props) {
    const minInitialChallengeWindowDuration = formatTimeToReadable(Number(oracleConfig.minInitialChallengeWindowDuration), 'ns');
    const defaultChallengeWindowDuration = formatTimeToReadable(Number(oracleConfig.defaultChallengeWindowDuration), 'ns');

    return (
        <Card className={s.card}>
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
                        value: <span>{oracleConfig.bondToken.contractId}</span>
                    }, {
                        label: trans('oracleConfigInfoCard.label.stakeToken'),
                        value: <span>{oracleConfig.stakeToken.contractId}</span>
                    }, {
                        label: trans('oracleConfigInfoCard.label.finalArbitrator'),
                        value: <span>{oracleConfig.finalArbitrator}</span>
                    }, {
                        label: trans('oracleConfigInfoCard.label.finalArbitratorInvokeAmount'),
                        value: <span>{formatToken(oracleConfig.finalArbitratorInvokeAmount, oracleConfig.stakeToken.decimals, 2)} {oracleConfig.stakeToken.symbol}</span>
                    }, {
                        label: trans('oracleConfigInfoCard.label.resolutionFeePercentage'),
                        value: <span>{oracleConfig.resolutionFeePercentage / 1000}%</span>
                    }, {
                        label: trans('oracleConfigInfoCard.label.fluxMarketCap'),
                        value: <span>${prettyFormatNumber(formatToken(oracleConfig.fluxMarketCap, 2, 2))}</span>
                    }, {
                        label: trans('oracleConfigInfoCard.label.totalValueStaked'),
                        value: <span>{oracleConfig.totalValueStaked}</span>
                    }, {
                        label: trans('oracleConfigInfoCard.label.maxOutcomes'),
                        value: <span>{oracleConfig.maxOutcomes}</span>
                    }, {
                        label: trans('oracleConfigInfoCard.label.minInitialChallengeWindowDuration'),
                        value: <span>
                            {trans('global.date.smallFormat', {
                                days: minInitialChallengeWindowDuration.days.toString(),
                                hours: minInitialChallengeWindowDuration.hours.toString(),
                                minutes: minInitialChallengeWindowDuration.minutes.toString(),
                                seconds: minInitialChallengeWindowDuration.seconds.toString(),
                            })} / {oracleConfig.minInitialChallengeWindowDuration} ns
                        </span>
                    }, {
                        label: trans('oracleConfigInfoCard.label.defaultChallengeWindowDuration'),
                        value: <span>{
                            trans('global.date.smallFormat', {
                                days: defaultChallengeWindowDuration.days.toString(),
                                hours: defaultChallengeWindowDuration.hours.toString(),
                                minutes: defaultChallengeWindowDuration.minutes.toString(),
                                seconds: defaultChallengeWindowDuration.seconds.toString(),
                            })} / {oracleConfig.defaultChallengeWindowDuration} ns
                        </span>
                    }, {
                        label: trans('oracleConfigInfoCard.label.validityBond'),
                        value: <span>{formatToken(oracleConfig.validityBond, oracleConfig.bondToken.decimals, 2)} {oracleConfig.bondToken.symbol}</span>
                    },]}
                />
            </CardContent>
        </Card>
    );
}
