import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { useSelector } from 'react-redux';
import { Reducers } from '../../redux/reducers';
import s from './AnnouncementConnector.module.scss';

export default function AnnouncementConnector() {
    const importantMessages = useSelector((store: Reducers) => store.appconfig.appConfig.importantMessages);

    return (
        <div className={s.root}>
            {importantMessages.map((message) => (
                <Alert className={s.alert} key={message.key} severity={message.type}>
                    <div dangerouslySetInnerHTML={{ __html: message.message }} />
                </Alert>
            ))}
        </div>
    );
}
