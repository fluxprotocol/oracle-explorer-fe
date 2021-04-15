import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import Card from '../../components/Card';
import { DataRequestViewModel } from '../../models/DataRequest';
import trans from '../../translation/trans';

import s from './CallDataInfoCard.module.scss';

interface Props {
    dataRequest: DataRequestViewModel;
    className?: string;
}

export default function CallDataInfoCard({
    dataRequest,
    className,
}: Props) {
    const hasContent = dataRequest.sources.length > 0 || Boolean(dataRequest.outcomes?.length);

    if (!hasContent) {
        return null;
    }

    return (
        <Card className={className}>
            <CardContent>
                {dataRequest.sources.length > 0 && (
                    <div className={s.titleWrapper}>
                        <h2 className={s.title}>{trans('callDataInfo.title')}</h2>
                    </div>
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
                        <div className={s.titleWrapper}>
                            <h2 className={s.title}>{trans('callDataInfo.outcomes.title')}</h2>
                        </div>
                        <pre className={s.possibleOutcomes}>
                            {JSON.stringify(dataRequest.outcomes, null, 4)}
                        </pre>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
