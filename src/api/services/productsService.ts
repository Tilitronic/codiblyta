import axios from 'axios';
import { GetProductsParams } from '../../features/ProductsPage/productsSlice';

export async function fetchProducts ({ page, per_page }: GetProductsParams = { page: 1, per_page: 5 }) {
    const url = `https://reqres.in/api/products?page=${page}&per_page=${per_page}`;
    try {
        const response = await axios.get(url);
        console.log('Products: ', response.data);
        return response.data;
    } catch (error) {
        console.log('Products request failed:', error);
    }
}
