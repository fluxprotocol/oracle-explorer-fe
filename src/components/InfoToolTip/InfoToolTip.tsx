import React from 'react';
import classnames from 'classnames';

import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';

import s from './InfoToolTip.module.scss';

interface Props {
    text: string;
    className?: string;
}

export default function InfoToolTip({
    text,
    className = '',
}: Props) {
    return (
        <Tooltip title={text} arrow>
            <div className={classnames(className, s.infoTooltipWrapper)}>
                <InfoIcon />
            </div>
        </Tooltip>
    );
}
