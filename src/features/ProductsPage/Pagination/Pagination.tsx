import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Typography } from '@mui/material';
import './Pagination.css';

interface PaginationProps {
    quantity: number
    perPage: number
    setPage: (pageNum: number) => void
    currentPage: number
}
export function Pagination ({ quantity, perPage, setPage, currentPage }: PaginationProps) {
    const [buttons, setButtons] = useState(0);
    useEffect(() => {
        const num = quantity % perPage !== 0 ? 1 : 0;
        const buttonsNum = Math.floor(quantity / perPage) + num;
        setButtons(buttonsNum);
    }, [quantity, perPage]);

    const turnPage = (page: number, direction: 'next' | 'prev'): void => {
        if (direction === 'next' && page + 1 <= buttons - 1) {
            setPage(page + 1);
        } else if (direction === 'next' && page + 1 > buttons - 1) {
            setPage(0);
        } else if (direction === 'prev' && page - 1 >= 0) {
            setPage(page - 1);
        } else if (direction === 'prev' && page - 1 < 0) {
            setPage(buttons - 1);
        }
    };

    return (
        <div className='paginationWrapper'>
            <Button onClick={() => { turnPage(currentPage, 'prev'); }} variant="contained">
                <ArrowBackIosNewIcon/>
            </Button>
            <div className='paginationPages'>
                {buttons !== 0 && Array.from(Array(buttons).keys()).map((num) => {
                    const isActive = num === currentPage ? 'active' : '';
                    const className = 'paginationButton ' + isActive;
                    return (
                        <Button
                            key={num}
                            onClick={() => { setPage(num); }}
                            className={className}
                            variant={currentPage === num ? 'contained' : 'text'}
                            size='small'
                            sx={{
                                padding: '0',
                                margin: '0',
                                borderRadius: '50px',
                            }}
                        >
                            <Typography>{num + 1}</Typography>
                        </Button>
                    );
                })}
            </div>
            <Button onClick={() => { turnPage(currentPage, 'next'); }} variant="contained">
                <ArrowForwardIosIcon/>
            </Button>
        </div>
    );
}
