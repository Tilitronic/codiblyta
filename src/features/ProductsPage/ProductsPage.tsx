import { useEffect } from 'react';
import { ProductsTable } from './ProductsTable/ProductsTable';
import { getProducts, ProductsState } from './productsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import './ProdutsPage.css';

export function ProductsPage () {
    const dispatch = useAppDispatch();
    const products: ProductsState = useAppSelector((state) => state.products);
    useEffect(() => {
        dispatch(getProducts({ page: 1, per_page: 100 }));
    }, []);
    console.log('products', products);
    return (
        <div className='productsPage'>
            {products.data.length
                ? <ProductsTable products={products.data}/>
                : null}
            {products.error
                ? <div className='errorMessage'>
                    <Paper sx={{ maxWidth: '500px', height: '50px', padding: '50px', display: 'flex', alignItems: 'center' }}>
                        <Typography>
                            {'API request returned an error ' + products.status + ' with the following message: ' + products.massage}
                        </Typography>
                    </Paper>
                </div>
                : null}
        </div>

    );
}
