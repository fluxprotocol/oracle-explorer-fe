import React from 'react';

import s from './Footer.module.scss';


export default function Footer() {
    return (
        <footer className={s.footer}>
            <div className={s.footerWrapper}>
                <div className={s.logo} />
            </div>
        </footer>
    );
}
