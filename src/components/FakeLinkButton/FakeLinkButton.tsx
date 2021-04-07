import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';

import s from './FakeLinkButton.module.scss';

interface Props {
    className?: string;
    onClick?: () => void;
}

export default function FakeLinkButton({
    children,
    className,
    onClick,
}: PropsWithChildren<Props>) {
    return (
        <button onClick={onClick} className={classnames(s.button, className)}>
            {children}
        </button>
    );
}
