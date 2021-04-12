import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import Card from '../../components/Card';
import { DataRequestViewModel } from '../../models/DataRequest';
import trans from '../../translation/trans';

import s from './RequestInfoCard.module.scss';
import InformationRows from '../InformationRows';
import { formatToken } from '../../utils/tokenUtils';
import { transfromOutcomeToString } from '../../models/DataRequestOutcome';
import { Link } from 'react-router-dom';
import { routePaths } from '../../routes';

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
                        label: trans('requestInfo.label.feePercentage'),
                        value: <span>{`${dataRequest.config.resolutionFeePercentage}%`}</span>,
                    }, {
                        label: trans('requestInfo.label.totalStaked'),
                        value: <span>{`${formatToken(dataRequest.totalStaked)} FLX`}</span>,
                    }, {
                        label: trans('requestInfo.label.finalizedOutcome'),
                        value: <span>{dataRequest.finalized_outcome ? transfromOutcomeToString(dataRequest.finalized_outcome) : 'null'}</span>,
                    }]}
                />
            </CardContent>
        </Card>
    );
}
