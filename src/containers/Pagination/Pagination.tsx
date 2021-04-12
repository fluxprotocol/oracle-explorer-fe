import React from 'react';
import classnames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import trans from '../../translation/trans';

import s from './Pagination.module.scss';

interface Props {
    total: number;
    page: number;
    rowsPerPage: number;
    onChangePage: (page: number) => void;
    className?: string;
}

export default function Pagination({
    total,
    page,
    onChangePage,
    rowsPerPage,
    className
}: Props) {
    const handleFirstPageButtonClick = () => {
        onChangePage(0);
    };

    const handleBackButtonClick = () => {
        onChangePage(page - 1);
    };

    const handleNextButtonClick = () => {
        onChangePage(page + 1);
    };

    const handleLastPageButtonClick = () => {
        onChangePage(total);
    };

    return (
        <div className={classnames(s.pagination, className)}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                <FirstPageIcon />
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                <KeyboardArrowLeft />
            </IconButton>
            <span>
                {trans('pagination.pageIndication', {
                    currentPage: (page + 1).toString(),
                    totalPages: (total + 1).toString(),
                })}
            </span>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page === total}
                aria-label="next page"
            >
                <KeyboardArrowRight />
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page === total}
                aria-label="last page"
            >
                <LastPageIcon />
            </IconButton>
        </div>
    );
}
