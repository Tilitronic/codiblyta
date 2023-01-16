import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Typography } from '@mui/material';

interface PaginationProps {
    totalPages: number
    setPage: (pageNum: number) => void
    currentPage: number
}
export function Pagination ({ totalPages, setPage, currentPage }: PaginationProps) {
    const turnPage = (page: number, direction: 'next' | 'prev'): void => {
        if (direction === 'next' && page + 1 <= totalPages - 1) {
            setPage(page + 1);
        } else if (direction === 'next' && page + 1 > totalPages - 1) {
            setPage(0);
        } else if (direction === 'prev' && page - 1 >= 0) {
            setPage(page - 1);
        } else if (direction === 'prev' && page - 1 < 0) {
            setPage(totalPages - 1);
        }
    };

    return (
        <div style={styles.paginationWrapper}>
            <Button onClick={() => { turnPage(currentPage, 'prev'); }} variant="contained">
                <ArrowBackIosNewIcon/>
            </Button>
            <div style={styles.paginationPages}>
                {totalPages && Array.from(Array(totalPages).keys()).map((num) => {
                    return (
                        <Button
                            key={num}
                            onClick={() => { setPage(num); }}
                            variant={currentPage === num ? 'contained' : 'text'}
                            size='small'
                            sx={styles.pageButton}
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

const styles = {
    paginationWrapper: {
        display: 'flex',
        flexDirection: 'row' as 'row'
    },
    paginationPages: {
        marginLeft: '15px',
        marginRight: '15px',
        display: 'flex' as 'flex',
        alignItems: 'center',
        maxWidth: '900px',
    },
    pageButton: {
        padding: '0',
        margin: '0',
        borderRadius: '50px',
    }
};
