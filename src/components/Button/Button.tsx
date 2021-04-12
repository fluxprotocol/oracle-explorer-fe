import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';
import { default as MuiButton } from '@material-ui/core/Button';

import s from './Button.module.scss';

interface Props {
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
}

export default function Button({
    children,
    className,
    disabled = false,
    onClick = () => {},
}: PropsWithChildren<Props>) {
    return (
        <MuiButton
            className={classnames(className, s.button)}
            variant="contained"
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </MuiButton>
    );
}
