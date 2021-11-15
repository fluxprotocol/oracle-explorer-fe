import React, { PropsWithChildren } from 'react';
import MenuConnector from '../../connectors/MenuConnector';
import Footer from '../Footer';
import AnnouncementConnector from '../../connectors/AnnouncementConnector';

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
                <AnnouncementConnector />
                {children}
            </main>
            <Footer />
        </div>
    );
}
