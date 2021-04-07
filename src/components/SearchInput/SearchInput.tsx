import React, { FormEvent, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

interface Props {
    label: string;
    value?: string;
    className?: string;
    onChange?: (value: string) => void;
}

export default function SearchInput({
    label,
    className,
    value,
    onChange = () => {},
}: Props) {
    const handleChange = useCallback((event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onChange(event.currentTarget.value);
    }, [onChange]);

    return (
        <TextField
            label={label}
            className={className}
            value={value}
            type="search"
            onChange={handleChange}
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
