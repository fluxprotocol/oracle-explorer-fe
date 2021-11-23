import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import Card from '../../components/Card';
import { DataRequestViewModel } from '../../models/DataRequest';
import trans, { booleanToYesNo } from '../../translation/trans';

import s from './RequestInfoCard.module.scss';
import InformationRows from '../InformationRows';
import { formatToken } from '../../utils/tokenUtils';
import { transfromOutcomeToString } from '../../models/DataRequestOutcome';
import { Link } from 'react-router-dom';
import { routePaths } from '../../routes';
import { prettyFormatDate } from '../../utils/dateUtils';

interface Props {
    dataRequest: DataRequestViewModel;
    className?: string;
}

export default function RequestInfoCard({
    dataRequest,
    className,
}: Props) {
    return (
        <Card className={className}>
            <CardContent>
                <div className={s.titleWrapper}>
                    <h2 className={s.title}>{trans('requestInfo.title')}</h2>
                </div>
                <InformationRows
                    rows={[{
                        label: trans('requestInfo.label.requestor'),
                        value: <Link className={s.link} to={routePaths.account('near', dataRequest.requestor)}>{dataRequest.requestor}</Link>,
                    }, {
                        label: trans('requestInfo.label.dateCreated'),
                        value: <span>{prettyFormatDate(dataRequest.date)}</span>,
                    }, {
                        label: trans('requestInfo.label.config'),
                        value: <Link className={s.link} to={routePaths.config('near', dataRequest.config.id)}>{dataRequest.config.id}</Link>,
                    }, {
                        label: trans('requestInfo.label.finalArbitratorTriggered'),
                        value: <span>{booleanToYesNo(dataRequest.finalArbitratorTriggered)}</span>,
                    }, {
                        label: trans('requestInfo.label.feeReward'),
                        value: <span>{formatToken(dataRequest.paidFee ?? '0', dataRequest.stakeToken.decimals)} {dataRequest.stakeToken.symbol}</span>,
                    }, {
                        label: trans('requestInfo.label.totalStaked'),
                        value: <span>{`${formatToken(dataRequest.totalStaked, dataRequest.stakeToken.decimals)} ${dataRequest.stakeToken.symbol}`}</span>,
                    }, {
                        label: trans('requestInfo.label.totalCorrectStaked'),
                        value: (
                            <span>
                                {dataRequest.totalCorrectStaked ?
                                    `${formatToken(dataRequest.totalCorrectStaked, dataRequest.stakeToken.decimals)} ${dataRequest.stakeToken.symbol}` :
                                    trans('global.na')
                                }
                            </span>
                        )
                    }, {
                        label: trans('requestInfo.label.totalIncorrectStaked'),
                        value: (
                            <span>
                                {dataRequest.totalIncorrectStaked ?
                                    `${formatToken(dataRequest.totalIncorrectStaked, dataRequest.stakeToken.decimals)} ${dataRequest.stakeToken.symbol}` :
                                    trans('global.na')
                                }
                            </span>
                        )
                    }, {
                        label: trans('requestInfo.label.tags'),
                        value: <span>{dataRequest.tags.length ? dataRequest.tags.map(t => `"${t}"`).join(', ') : trans('requestInfo.label.noTags')}</span>
                    }, {
                        label: trans('requestInfo.label.finalizedOutcome'),
                        value: <span>{dataRequest.finalized_outcome ? transfromOutcomeToString(dataRequest.finalized_outcome) : 'null'}</span>,
                    }]}
                />
            </CardContent>
        </Card>
    );
}
