import React from 'react';
import { default as ReactCountdown } from 'react-countdown';

interface Props {
    date: Date;
    onComplete: () => void;
}

export default function Countdown({
    date,
    onComplete,
}: Props) {
    return (
        <ReactCountdown date={date} onComplete={onComplete} />
    );
}
