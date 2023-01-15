import { ProductObj } from '../../productsSlice';

import Typography from '@mui/material/Typography';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

interface ProductRowProps extends ProductObj {
    handleModalOpen: (id: number | string) => void
}
export function ProductRow ({ handleModalOpen, id, name, year, color }: ProductRowProps) {
    const handleClick = () => {
        handleModalOpen(id);
    };
    return (
        <TableRow style={{ backgroundColor: color, ...styles.tableRow }} onClick={handleClick}>
            <TableCell sx={styles.tableCell}>
                <Typography sx={styles.text}>{id}</Typography>
            </TableCell>
            <TableCell sx={styles.tableCell}>
                <Typography sx={styles.text}>{name}</Typography>
            </TableCell>
            <TableCell sx={styles.tableCell}>
                <Typography sx={styles.text}>{year}</Typography>
            </TableCell>
        </TableRow>
    );
}

const styles = {
    text: {
        height: '55px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableRow: {
        cursor: 'pointer',
    },
    tableCell: {
        margin: '0',
        padding: '0',
    }

};
