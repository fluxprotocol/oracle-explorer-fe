import React from 'react';
import LabeledText from '../../compositions/LabeledText';

import s from './InformationRows.module.scss';

export interface InformationRow {
    label: string;
    value: string;
}

interface Props {
    rows: InformationRow[];
}

export default function InformationRows({
    rows,
}: Props) {
    return (
        <div className={s.root}>
            {rows.map((row) => {
                return (
                    <LabeledText className={s.item} label={row.label}>
                        {row.value}
                    </LabeledText>
                );
            })}
        </div>
    );
}
