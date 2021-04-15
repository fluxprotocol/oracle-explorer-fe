import React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Input, { InputProps } from '../../components/Input/Input';
import trans from '../../translation/trans';

interface Props extends InputProps {
    showMax?: boolean;
    onMaxClick?: () => void,
}

export default function NumberInput({
    showMax = false,
    onMaxClick = () => {},
    ...props
}: Props) {
    return (
        <Input
            {...props}
            type="number"
            endAdornment={
                <>
                    {showMax && (
                        <InputAdornment position="end">
                            <Button onClick={onMaxClick}>
                                {trans('global.max')}
                            </Button>
                        </InputAdornment>
                    )}
                </>
            }
        />
    );
}
