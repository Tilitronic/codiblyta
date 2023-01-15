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
        <TableRow style={{ backgroundColor: color }} onClick={handleClick}>
            <TableCell>
                <Typography>{id}</Typography>
            </TableCell>
            <TableCell>
                <Typography>{name}</Typography>
            </TableCell>
            <TableCell>
                <Typography>{year}</Typography>
            </TableCell>
        </TableRow>
    );
}
