import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import SearchForm from '../../containers/SearchForm';
import { routePaths } from '../../routes';
import { search } from '../../services/SearchService';

interface Props {
    className?: string;
    inputClassName?: string;
}

export default function SearchConnector({
    className,
    inputClassName,
}: Props) {
    const history = useHistory();
    const handleSearch = useCallback(async (query) => {
        const result = await search(query);

        if (result.total === 0) {
            history.push(routePaths.search(query));
            return;
        }

        history.push(result.items[0].url);
    }, [history]);

    return (
        <SearchForm
            onSearch={handleSearch}
            className={className}
            inputClassName={inputClassName}
        />
    );
}
