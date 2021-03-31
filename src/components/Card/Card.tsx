import React from 'react';
import classnames from 'classnames';
import { CardProps, default as MuiCard } from '@material-ui/core/Card';

import s from './Card.module.scss';

export default function Card(props: CardProps) {
    return (
        <MuiCard {...props} className={classnames(s.card, props.className)} />
    );
}
