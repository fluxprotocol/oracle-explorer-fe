import React from 'react';
import { useSelector } from 'react-redux';
import CallDataInfoCard from '../../containers/CallDataInfoCard';
import { Reducers } from '../../redux/reducers';

interface Props {
    className?: string;
}

export default function CallDataInfoConnector({
    className,
}: Props) {
    const dataRequest = useSelector((store: Reducers) => store.dataRequest.dataRequestDetail);

    if (!dataRequest) {
        return null;
    }

    return (
        <CallDataInfoCard
            dataRequest={dataRequest}
            className={className}
        />
    );
}
