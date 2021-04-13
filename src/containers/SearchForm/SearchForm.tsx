import React, { FormEvent, useCallback, useState } from 'react';
import SearchInput from '../../components/SearchInput';
import trans from '../../translation/trans';

interface Props {
    onSearch: (query: string) => void;
    className?: string;
    inputClassName?: string;
}

export default function SearchForm({
    onSearch,
    className,
    inputClassName,
}: Props) {
    const [query, setQuery] = useState('');
    const handleSearchSubmit = useCallback((event: FormEvent) => {
        event.preventDefault();
        onSearch(query);
    }, [query, onSearch]);

    return (
        <form className={className} onSubmit={handleSearchSubmit}>
            <SearchInput
                label={trans('menu.label.search')}
                onChange={v => setQuery(v)}
                value={query}
                className={inputClassName}
            />
            <input type="submit" hidden />
        </form>
    );
}
