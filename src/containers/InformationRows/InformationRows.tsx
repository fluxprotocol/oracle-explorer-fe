import React, { ReactElement } from 'react';
import LabeledText from '../../compositions/LabeledText';

import s from './InformationRows.module.scss';

export interface InformationRow {
    label: string;
    value: ReactElement;
    info?: string;
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
                    <LabeledText key={row.label} className={s.item} label={row.label} info={row.info}>
                        {row.value}
                    </LabeledText>
                );
            })}
        </div>
    );
}
