import React, { ChangeEvent } from 'react';
import { default as MuiSelect } from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import s from './Select.module.scss';


export interface SelectItem {
    name: string;
    value: string;
}

interface Props {
    id: string;
    items: SelectItem[];
    value: string;
    label?: string;
    onChange?: (value: string) => void;
}

export default function Select({
    items,
    value,
    label,
    id,
    onChange = () => {},
}: Props) {
    function handleChange(event: ChangeEvent<{ name?: string, value: unknown }>) {
        onChange(event.target.value as string);
    }

    return (
        <div>
            <InputLabel id={id}>{label}</InputLabel>
            <MuiSelect
                value={value}
                labelId={id}
                className={s.select}
                onChange={handleChange}
            >
                {items.map(item => (
                    <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
                ))}
            </MuiSelect>
        </div>
    );
}
