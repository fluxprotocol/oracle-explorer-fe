import React, { PropsWithChildren } from 'react';
import MenuConnector from '../../connectors/MenuConnector';

import s from './Page.module.scss';

interface Props {
    className?: string;
    bodyClassName?: string;
    hasNavigation?: boolean;
}

export default function Page({
    className,
    children,
    hasNavigation = true,
}: PropsWithChildren<Props>) {
    return (
        <div className={s.page}>
            <MenuConnector />
            <main className={s.body}>
                {children}
            </main>
        </div>
    );
}
