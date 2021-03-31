import React from 'react';
import { useSelector } from 'react-redux';
import StakerAnswersInfoCard from '../../containers/StakersReportInfoCard';
import { Reducers } from '../../redux/reducers';

interface Props {
    className?: string;
}

export default function StakersReportInfoConnector({
    className,
}: Props) {
    const dataRequest = useSelector((store: Reducers) => store.dataRequest.dataRequestDetail);

    if (!dataRequest) {
        return null;
    }

    return (
        <StakerAnswersInfoCard
            dataRequest={dataRequest}
            className={className}
        />
    );
}
