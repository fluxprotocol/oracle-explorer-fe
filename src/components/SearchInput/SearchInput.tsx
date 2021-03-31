import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

interface Props {
    label: string;
    className?: string;
}

export default function SearchInput({
    label,
    className,
}: Props) {
    return (
        <TextField
            label={label}
            className={className}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    );
}
