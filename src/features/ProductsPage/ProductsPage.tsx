import { getProducts, getProductById } from './productsSlice';
import { Pagination } from './Pagination/Pagination';
import { Modal } from '../../components/Modal/Modal';
import { ProductInfo } from './ProductInfo/ProductInfo';
import { ProductTable } from './ProductTable/ProductTable';
import { Search } from '../../components/Search/Search';
import { ApiErrorMessage } from '../../components/ApiErrorMessage/ApiErrorMessage';
import { parseParam } from '../../utils/parseParam';
import { useState, useEffect, ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import Typography from '@mui/material/Typography';

export function ProductsPage () {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [searchState, setSearchState] = useState('');
    const [pageState, setPageState] = useState(0);
    const [idState, setIdState] = useState('');

    const [searchInput, setSearchInput] = useState('');

    const dispatch = useAppDispatch();
    const { page, id, search } = useParams();

    const products = useAppSelector(state => state.products);

    useEffect(() => {
        const pageVal = Number(parseParam(page));
        const idVal = parseParam(id);
        const searchVal = parseParam(search);

        if (idVal && !isModalOpen) {
            setIdState(idVal);
            dispatch(getProductById({ id: idVal }));
            setIsModalOpen(true);
            return;
        }
        if (!idVal && isModalOpen) {
            setIsModalOpen(false);
        }
        if (searchVal) {
            setPageState(0);
            setSearchState(searchVal);
            setSearchInput(searchVal);
            dispatch(getProductById({ id: searchVal }));
            return;
        }
        if (pageVal) {
            setPageState(pageVal);
            dispatch(getProducts({ page: pageVal + 1, per_page: 5 }));
            return;
        }
        if (!searchVal && !idVal && !pageVal) {
            setSearchInput('');
            dispatch(getProducts({ page: 1, per_page: 5 }));
        }
    }, []);

    useEffect(() => {
        updatePath(pageState, idState, searchState);
    }, [pageState, idState, searchState]);

    const updatePath = (page: string | number, id: string | number, filter: string) => {
        window.history.replaceState(null, '', `/products/page=${page}/id=${id}/search=${filter}`);
    };

    const searchProducts = () => {
        setSearchState(searchInput);
        setPageState(0);
        dispatch(getProductById({ id: searchInput }));
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setIdState('');
    };

    const setAndChangePage = (pageNum: number) => {
        setPageState(pageNum);
        dispatch(getProducts({ page: pageNum + 1, per_page: 5 }));
    };

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.match(/[\d]*/);
        if (value) {
            setSearchInput(value.join(''));
        }
        if (value && !value.join('')) {
            dispatch(getProducts({ page: 1, per_page: 5 }));
        }
    };

    const clearFilterInput = () => {
        setSearchInput('');
        dispatch(getProducts({ page: 1, per_page: 5 }));
    };

    return (
        <div style={styles.productPageWrapper}>
            <Search label='Search by id' value={searchInput} handleInput={handleInput} onSearch={searchProducts} onClear={clearFilterInput}/>
            <Typography variant='h4' sx={styles.tableTitle}>Products table</Typography>
            {products.data.length
                ? <ProductTable items={products.data} setIsModalOpen={setIsModalOpen} setIdState={setIdState}/>
                : null}
            <Modal isModalOpen={isModalOpen} handleModalClose={handleModalClose}>
                { idState
                    ? <ProductInfo products={products.data} id={idState}/>
                    : null
                }
            </Modal>
            {products.totalPages
                ? <Pagination totalPages={products.totalPages} setPage={setAndChangePage} currentPage={pageState}/>
                : null}
            {products.isError
                ? <ApiErrorMessage status={products.status} massage={products.massage}/>
                : null}
        </div>
    );
}

const styles = {
    productPageWrapper: {
        marginTop: '30px',
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
    },
    filterInput: {
        display: 'flex',
        margin: '15px',
        maxWidth: '270px'
    },
    tableTitle: {
        marginBottom: '25px'
    },
};
