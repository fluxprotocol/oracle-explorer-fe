import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import Card from '../../components/Card';
import { DataRequestViewModel } from '../../models/DataRequest';
import trans from '../../translation/trans';
import LabeledText from '../../compositions/LabeledText';

import s from './RequestInfoCard.module.scss';

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
                <div className={s.requestDetails}>
                    <LabeledText className={s.item} label={trans('requestInfo.label.requestor')}>
                        {dataRequest.requestor}
                    </LabeledText>
                    <LabeledText className={s.item} label={trans('requestInfo.label.feePercentage')}>
                        {dataRequest.config.resolutionFeePercentage}%
                    </LabeledText>
                    <LabeledText className={s.item} label={trans('requestInfo.label.settlementTime')}>
                        {dataRequest.settlementTime.toDateString()}
                    </LabeledText>
                    <LabeledText className={s.item} label={trans('requestInfo.label.totalStaked')}>
                        TBD FLX
                    </LabeledText>
                </div>
            </CardContent>
        </Card>
    );
}
