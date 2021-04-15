import React from 'react';
import CardContent from '@material-ui/core/CardContent';

import Card from '../../../../components/Card';

import s from './StatCard.module.scss';

interface Props {
    label: string;
    value: string;
}

export default function StatCard({
    label,
    value,
}: Props) {
    return (
        <Card className={s.card}>
            <CardContent>
                <h2 className={s.statLabel}>{label}</h2>
                <span className={s.statValue}>{value}</span>
            </CardContent>
        </Card>
    );
}
