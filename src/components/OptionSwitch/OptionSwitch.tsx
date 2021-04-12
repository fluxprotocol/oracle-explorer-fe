import React, { ReactElement } from 'react';
import classnames from 'classnames';
import Switch from '@material-ui/core/Switch';

import s from './OptionSwitch.module.scss';

interface Props {
    className?: string;
    label: string,
    labelA: string;
    labelB: string;
    onChange?: (checked: boolean) => void;
    value?: boolean;
}

export default function OptionSwitch({
    label,
    labelA,
    labelB,
    onChange = () => {},
    value,
    className = '',
}: Props): ReactElement {
    return (
        <span className={classnames(s.root, className)}>
            <span>{label}</span>
            <div className={s.options}>
                <span>{labelA}</span>
                <Switch
                    value={value}
                    classes={{
                        thumb: s.thumb,
                        track: s.track,
                        switchBase: s.switchBase,
                    }}
                    onChange={(_, checked) => onChange(checked)}
                />
                <span>{labelB}</span>
            </div>
        </span>
    );
}
