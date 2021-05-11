import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import Card from '../../components/Card';
import { DataRequestViewModel } from '../../models/DataRequest';
import trans from '../../translation/trans';

import s from './CallDataInfoCard.module.scss';
import LabeledText from '../../compositions/LabeledText';

interface Props {
    dataRequest: DataRequestViewModel;
    className?: string;
}

export default function CallDataInfoCard({
    dataRequest,
    className,
}: Props) {

    return (
        <Card className={className}>
            <CardContent>
                <div className={s.titleWrapper}>
                    <h2 className={s.title}>{trans('callDataInfo.title')}</h2>
                </div>

                {dataRequest.description && (
                    <LabeledText label={trans('callDataInfo.description')} className={s.label}>{dataRequest.description}</LabeledText>
                )}

                {dataRequest.sources.length > 0 && (
                    <table className={s.table}>
                        <thead>
                            <tr className={s.tableHeadRow}>
                                <th>{trans('callDataInfo.label.endPoint')}</th>
                                <th>{trans('callDataInfo.label.sourcePath')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataRequest.sources.map(source => (
                                <tr key={`${source.endPoint}_${source.sourcePath}`}>
                                    <td className={s.tableItem}>
                                        <span className={s.tableItemInner}>{source.endPoint}</span>
                                    </td>
                                    <td className={s.tableItem}><pre>{source.sourcePath}</pre></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {dataRequest.outcomes?.length && (
                    <>
                        <LabeledText label={trans('callDataInfo.outcomes.title')} />
                        <pre className={s.possibleOutcomes}>
                            {JSON.stringify(dataRequest.outcomes, null, 4)}
                        </pre>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
