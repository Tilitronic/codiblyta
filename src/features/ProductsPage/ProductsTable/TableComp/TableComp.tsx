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
        <div className='productsTableWrapper'>
            <TableContainer component={Paper}>
                <Table className='productsTable' sx={{ minWidth: 300 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography>id</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>name</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>year</Typography>
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
