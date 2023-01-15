import { ProductObj } from '../../productsSlice';
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

interface TableProps {
    pageProducts: ProductObj[]
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
    setIdState: Dispatch<SetStateAction<string>>
}
export function TableComp ({ pageProducts, setIsModalOpen, setIdState }: TableProps) {
    const handleModalOpen = (idSt: string | number) => {
        setIsModalOpen(true);
        setIdState(idSt.toString());
        console.log('modal is true');
    };

    return (
        <div className='productsTableWrapper' style={styles.productsTableWrapper}>
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
                        {pageProducts.length > 0
                            ? pageProducts.map((obj: ProductObj) => {
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
