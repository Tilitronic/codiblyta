/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { ProductObj } from '../productsSlice';
import { Pagination } from '../Pagination/Pagination';
import { Modal } from '../../../components/Modal/Modal';
import { ProductInfo } from './ProductInfo/ProductInfo';
import { TableComp } from './TableComp/TableComp';
import { parseParam } from '../../../utils/parseParam';
import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

interface ProductsTableProps {
    products: ProductObj[]
};

export function ProductsTable ({ products }: ProductsTableProps) {
    const [filtProducts, setFiltProducts] = useState<ProductObj[]>(products);
    const [pageProducts, setPageProducts] = useState<ProductObj[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [filterState, setFilterState] = useState('');
    const [pageState, setPageState] = useState(0);
    const [idState, setIdState] = useState('');

    const navigate = useNavigate();
    const { page, id, filter } = useParams();

    useEffect(() => {
        productsForPage(products, 5, 0);

        const pageVal = parseParam(page);
        const idVal = parseParam(id);
        const filterVal = parseParam(filter);

        if (idVal && !isModalOpen) {
            setIdState(idVal);
            console.log('id in state');
            setIsModalOpen(true);
        }
        if (pageVal) {
            setPageState(Number(pageVal));
            productsForPage(filtProducts, 5, pageVal);
        }
        if (filterVal) {
            setFilterState(filterVal);
            filterProducts(products, filterVal);
        }
    }, [products]);

    useEffect(() => {
        updatePath(pageState, idState, filterState);
    }, [pageState, idState, filterState]);

    const updatePath = (page: string | number, id: string | number, filter: string) => {
        navigate(`/products/page=${page}/id=${id}/filter=${filter}`);
    };

    const productsForPage = (dataAr: ProductObj[], prodPerPage: number, page: string | undefined | number) => {
        page = Number(page);
        const prodAr = [...dataAr].slice(page * prodPerPage, page * prodPerPage + prodPerPage);
        setPageProducts(prodAr);
    };

    const filterProducts = (dataAr: ProductObj[], value: string) => {
        const prodAr = [...dataAr].filter((obj) => obj.id.toString().includes(value));
        setFiltProducts(prodAr);
        // if (!value) { return; }
        setPageState(0);
        productsForPage(prodAr, 5, 0);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setIdState('');
    };

    const setAndChangePage = (pageNum: number) => {
        setPageState(pageNum);
        productsForPage(filtProducts, 5, pageNum);
    };

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.match(/[\d]*/);
        if (value) {
            setFilterState(value.join(''));
            filterProducts(products, value.join(''));
        }
    };

    return (
        <div style={styles.mainProductsTableWrapper}>
            <div style={styles.filterInput}>
                <TextField
                    id="filled-search"
                    label="Filter by id"
                    type="search"
                    // variant="filled"
                    value={filterState}
                    onChange={handleInput}
                />
            </div>
            <Typography variant='h4' sx={styles.tableTitle}>Products table</Typography>
            <TableComp pageProducts={pageProducts} setIsModalOpen={setIsModalOpen} setIdState={setIdState}/>
            <Modal isModalOpen={isModalOpen} handleModalClose={handleModalClose}>
                { idState
                    ? <ProductInfo products={products} id={idState}/>
                    : null
                }
            </Modal>
            <div>
                <Pagination quantity={filtProducts.length} perPage={5} setPage={setAndChangePage} currentPage={pageState}/>
            </div>
        </div>
    );
}

const styles = {
    mainProductsTableWrapper: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
    },
    filterInput: {
        display: 'flex',
        margin: '15px',
    },
    tableTitle: {
        marginBottom: '25px'
    },
};
