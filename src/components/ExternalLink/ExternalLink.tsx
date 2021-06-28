import React, { PropsWithChildren } from 'react';
import { useCallback } from 'react';

import s from './ExternalLink.module.scss';

interface Props {
    href: string;
}

export default function ExternalLink({
    children,
    href,
}: PropsWithChildren<Props>) {
    const onClick = useCallback((event) => {
        event.preventDefault();
        window.open(href, '_blank');
    }, [href]);

    return (
        <a href={href} className={s.link} onClick={onClick}>{children}</a>
    );
}
