import React from 'react';
import { useSelector } from 'react-redux';
import RequestInfoCard from '../../containers/RequestInfoCard';
import { Reducers } from '../../redux/reducers';

interface Props {
    className?: string;
}

export default function RequestInfoConnector({
    className,
}: Props) {
    const dataRequest = useSelector((store: Reducers) => store.dataRequest.dataRequestDetail);

    if (!dataRequest) {
        return null;
    }

    return (
        <RequestInfoCard
            dataRequest={dataRequest}
            className={className}
        />
    );
}
