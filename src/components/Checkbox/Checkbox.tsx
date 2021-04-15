import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { default as MuiCheckbox } from '@material-ui/core/Checkbox';

import s from './Checkbox.module.scss';

interface Props {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label: string;
}

export default function Checkbox({
    checked,
    label,
    onChange,
}: Props) {
    return (
        <FormControlLabel
            control={
                <MuiCheckbox
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    classes={{
                        checked: s.checked
                    }}
                />
            }
            label={label}
        />
    );
}
