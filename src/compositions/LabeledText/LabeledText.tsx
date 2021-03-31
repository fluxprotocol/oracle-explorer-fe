import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';

import s from './LabeledText.module.scss';

interface Props {
    label: string;
    className?: string;
}

export default function LabeledText({
    label,
    children,
    className,
}: PropsWithChildren<Props>) {
    return (
        <div className={classnames(s.root, className)}>
            <span className={s.label}>{label}</span>
            <span>{children}</span>
        </div>
    );
}
