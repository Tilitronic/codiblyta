import { useState, useEffect } from 'react';
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
            <button onClick={() => { turnPage(currentPage, 'prev'); }}>
                {'<-'}
            </button>
            <div className='paginationPages'>
                {buttons !== 0 && Array.from(Array(buttons).keys()).map((num) => {
                    const isActive = num === currentPage ? 'active' : '';
                    const className = 'paginationButton ' + isActive;
                    return (
                        <button key={num} onClick={() => { setPage(num); }} className={className}>
                            {num + 1}
                        </button>
                    );
                })}
            </div>
            <button onClick={() => { turnPage(currentPage, 'next'); }}>
                {'->'}
            </button>
        </div>
    );
}
