import React from 'react';
import trans from '../../translation/trans';
import s from './DisclaimerBanner.module.scss';


export default function DisclaimerBanner() {
    return (
        <div className={s.root}>
            <span className={s.disclaimer}>{trans('global.disclaimer')}</span>
        </div>
    );
}
