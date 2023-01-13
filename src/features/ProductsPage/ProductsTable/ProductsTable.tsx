/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { ProductObj } from '../productsSlice';
import { ProductRow } from './ProductRow/ProductRow';
import { Pagination } from '../Pagination/Pagination';
import { Modal } from '../../../components/Modal/Modal';
import { ProductInfo } from './ProductInfo/ProductInfo';
import { parseParam } from '../../../utils/parseParam';
import { useState, useEffect, ChangeEvent } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './ProductsTable.css';
interface ProductsTableProps {
    products: ProductObj[]
};

export function ProductsTable ({ products }: ProductsTableProps) {
    const [filtProducts, setFiltProducts] = useState<ProductObj[]>(products);
    const [pageProducts, setPageProducts] = useState<ProductObj[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [filtrState, setFiltrState] = useState('');
    const [pageState, setPageState] = useState(0);
    const [idState, setIdState] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const { page, id, filtr } = useParams();
    console.log('filtProducts', filtProducts);
    console.log('pageProducts', pageProducts);
    useEffect(() => {
        productsForPage(products, 5, 0);

        const pageVal = parseParam(page);
        const idVal = parseParam(id);
        const filtrVal = parseParam(filtr);

        if (idVal && !isModalOpen) {
            setIdState(idVal);
            console.log('id in state');
            setIsModalOpen(true);
        }
        if (pageVal) {
            setPageState(Number(pageVal));
            productsForPage(filtProducts, 5, pageVal);
        }
        if (filtrVal) {
            setFiltrState(filtrVal);
            filterProducts(products, filtrVal);
        }
    }, [products]);

    useEffect(() => {
        updatePath(pageState, idState, filtrState);
    }, [pageState, idState, filtrState]);

    const productsForPage = (dataAr: ProductObj[], prodPerPage: number, page: string | undefined | number) => {
        page = Number(page);
        const prodAr = [...dataAr].slice(page * prodPerPage, page * prodPerPage + prodPerPage);
        setPageProducts(prodAr);
    };

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.match(/[\d]*/);
        if (value) {
            setFiltrState(value.join(''));
            filterProducts(products, value.join(''));
        }
    };

    const filterProducts = (dataAr: ProductObj[], value: string) => {
        const prodAr = [...dataAr].filter((obj) => obj.id.toString().includes(value));
        setFiltProducts(prodAr);
        setPageState(0);
        productsForPage(prodAr, 5, 0);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setIdState('');
    };
    const handleModalOpen = (idSt: string | number) => {
        setIsModalOpen(true);
        setIdState(idSt.toString());
        console.log('modal is true');
    };

    const setAndChangePage = (pageNum: number) => {
        setPageState(pageNum);
        productsForPage(filtProducts, 5, pageNum);
    };

    const updatePath = (page: string | number, id: string | number, filtr: string) => {
        navigate(`/products/page=${page}/id=${id}/filtr=${filtr}`);
    };

    return (
        <div className='mainProductsTableWrapper'>
            <div className='filterInput'>
                <p>Filter by id</p>
                <input type='text' value={filtrState} onChange={handleInput}/>
            </div>
            <h1>Products table</h1>
            <div className='productsTableWrapper'>
                <table className='productsTable'>
                    <thead>
                        <tr>
                            <th>
                                <p>id</p>
                            </th>
                            <th>
                                <p>name</p>
                            </th>
                            <th>
                                <p>year</p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageProducts.length > 0
                            ? pageProducts.map((obj: ProductObj) => {
                                return (
                                    <ProductRow key={obj.id} {...{ ...obj, handleModalOpen }}/>
                                );
                            })
                            : null}
                    </tbody>
                </table>
            </div>
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
