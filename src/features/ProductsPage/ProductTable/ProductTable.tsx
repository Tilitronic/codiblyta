import { ProductObj } from '../productsSlice';
import { ProductRow } from '../ProductRow/ProductRow';
import { Dispatch, SetStateAction } from 'react';

import { Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface ProductTableProps {
    items: ProductObj[]
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
    setIdState: Dispatch<SetStateAction<string>>
}
export function ProductTable ({ items, setIsModalOpen, setIdState }: ProductTableProps) {
    const handleModalOpen = (idSt: string | number) => {
        setIsModalOpen(true);
        setIdState(idSt.toString());
    };

    return (
        <div style={styles.productsTableWrapper}>
            <TableContainer component={Paper}>
                <Table className='productsTable' sx={styles.productsTable}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={styles.tableHead}>
                                <Typography sx={styles.text}>id</Typography>
                            </TableCell>
                            <TableCell sx={styles.tableHead}>
                                <Typography sx={styles.text}>name</Typography>
                            </TableCell>
                            <TableCell sx={styles.tableHead}>
                                <Typography sx={styles.text}>year</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.length > 0
                            ? items.map((obj: ProductObj) => {
                                return (
                                    <ProductRow key={obj.id} {...{ ...obj, handleModalOpen }}/>
                                );
                            })
                            : null}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

const styles = {
    text: {
        height: '55px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bolder'
    },
    productsTableWrapper: {
        marginBottom: '25px',
        height: '360px'
    },
    productsTable: {
        minWidth: '300px',
    },
    tableHead: {
        padding: '0',
        paddingLeft: '15px',
        paddingRight: '15px',
    }
};
