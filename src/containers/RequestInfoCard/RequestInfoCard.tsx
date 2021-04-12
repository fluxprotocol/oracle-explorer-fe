import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import Card from '../../components/Card';
import { DataRequestViewModel } from '../../models/DataRequest';
import trans from '../../translation/trans';

import s from './RequestInfoCard.module.scss';
import InformationRows from '../InformationRows';
import { formatToken } from '../../utils/tokenUtils';
import { transfromOutcomeToString } from '../../models/DataRequestOutcome';

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
                        value: dataRequest.requestor,
                    }, {
                        label: trans('requestInfo.label.feePercentage'),
                        value: `${dataRequest.config.resolutionFeePercentage}%`,
                    }, {
                        label: trans('requestInfo.label.totalStaked'),
                        value: `${formatToken(dataRequest.totalStaked)} FLX`,
                    }, {
                        label: trans('requestInfo.label.finalizedOutcome'),
                        value: dataRequest.finalized_outcome ? transfromOutcomeToString(dataRequest.finalized_outcome) : 'null',
                    }]}
                />
            </CardContent>
        </Card>
    );
}
