import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import { DataRequestViewModel } from '../../models/DataRequest';
import Card from '../../components/Card';
import trans from '../../translation/trans';

import s from './ResolutionWindowInfoCard.module.scss';
import ResolutionWindowAccordion from '../ResolutionWindowAccordion';

interface Props {
    dataRequest: DataRequestViewModel;
    className?: string;
}

export default function ResolutionWindowInfoCard({
    dataRequest,
    className,
}: Props) {
    const resolutionWindows = dataRequest.resolutionWindows.slice().reverse();

    return (
        <Card className={className}>
            <CardContent>
                <div className={s.titleWrapper}>
                    <h2 className={s.title}>{trans('stakerReportsInfo.title')}</h2>
                </div>
                <div>
                    {resolutionWindows.map((resolutionWindow, index) => {
                        return (
                            <ResolutionWindowAccordion
                                resolutionWindow={resolutionWindow}
                                defaultExpanded={index === 0}
                                key={resolutionWindow.round}
                                stakeToken={dataRequest.stakeToken}
                            />
                        );
                    })}
                </div>
                {resolutionWindows.length === 0 && (
                    <div className={s.noWindows}>
                        {trans('stakerReportsInfo.noWindows')}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
