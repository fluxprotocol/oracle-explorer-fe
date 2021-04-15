import React from 'react';
import Checkbox from '../../components/Checkbox';
import trans from '../../translation/trans';
import { DataRequestFilters } from '../../services/DataRequestService';

import s from './DataRequestsOverviewFilters.module.scss';
interface Props {
    totalRequests: string;
    filters: DataRequestFilters;
    onFilterChange: (filters: DataRequestFilters) => void;
}

export default function DataRequestsOverviewFilters({
    totalRequests,
    filters,
    onFilterChange,
}: Props) {

    function handleArbitratorCheckboxClick(checked: boolean) {
        onFilterChange({
            ...filters,
            onlyArbitratorRequests: checked,
        });
    }

    return (
        <div>
            <h1>{trans('dataRequests.title')}</h1>
            <div className={s.wrapper}>
                <span className={s.subtitle}>{trans('dataRequest.subtitle', { total: totalRequests })}</span>
                <Checkbox
                    label={trans('dataRequestFilters.label.arbitrator')}
                    checked={filters.onlyArbitratorRequests}
                    onChange={handleArbitratorCheckboxClick}
                />
            </div>
        </div>
    );
}
