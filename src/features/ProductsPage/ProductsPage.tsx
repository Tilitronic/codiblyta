import { useEffect } from 'react';
import { ProductsTable } from './ProductsTable/ProductsTable';
import { getProducts, ProductsState } from './productsSlice';
import { RootState, AppDispatch } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';

export function ProductsPage () {
    const dispatch = useDispatch<AppDispatch>();
    const products: ProductsState = useSelector((state: RootState) => state.products);
    useEffect(() => {
        dispatch(getProducts({ page: 1, per_page: 100 }));
    }, []);
    console.log('products', products);
    return (
        <div>
            {products.data.length > 0
                ? <ProductsTable products={products.data}/>
                : null}

        </div>
    );
}
