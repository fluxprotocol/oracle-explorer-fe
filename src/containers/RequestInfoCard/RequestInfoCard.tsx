import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import Card from '../../components/Card';
import { DataRequestViewModel } from '../../models/DataRequest';
import trans from '../../translation/trans';

import s from './RequestInfoCard.module.scss';
import InformationRows from '../InformationRows';
import { prettyFormatDate } from '../../utils/dateUtils';
import { formatToken } from '../../utils/tokenUtils';

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
                    }]}
                />
            </CardContent>
        </Card>
    );
}
