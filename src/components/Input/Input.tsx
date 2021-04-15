import React from 'react';
import classnames from 'classnames';
import TextField from '@material-ui/core/TextField';

import s from './Input.module.scss';

export interface InputProps {
    label?: string;
    className?: string;
    type?: 'text' | 'number';
    onChange?: (value: string) => void;
    value?: string;
    error?: string;
    endAdornment?: any;
}

export default function Input({
    className,
    label,
    type,
    onChange = () => {},
    value,
    error,
    endAdornment,
}: InputProps) {
    return (
        <TextField
            label={label}
            className={classnames(className, s.input)}
            type={type}
            onChange={(event) => onChange(event.currentTarget.value)}
            value={value}
            error={!!error}
            helperText={error}
            InputProps={{
                endAdornment,
            }}
        />
    );
}
