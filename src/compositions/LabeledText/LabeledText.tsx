import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';

import s from './LabeledText.module.scss';
import InfoToolTip from '../../components/InfoToolTip';

interface Props {
    label: string;
    info?: string;
    className?: string;
}

export default function LabeledText({
    label,
    info = '',
    children,
    className,
}: PropsWithChildren<Props>) {
    return (
        <div className={classnames(s.root, className)}>
            <span className={s.label}>
                {label}
                {info && <InfoToolTip className={s.tooltip} text={info} />}
            </span>
            <span>{children}</span>
        </div>
    );
}
