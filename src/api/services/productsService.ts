import { api } from '../axiosConfig';
import { GetProductsParams } from '../../features/ProductsPage/productsSlice';

export async function fetchProducts ({ page, per_page }: GetProductsParams = { page: 1, per_page: 5 }) {
    // const url = 'https://reqres.in/api/products/20';
    const url = `products?page=${page}&per_page=${per_page}`;
    try {
        const response = await api.get(url);
        return { data: response.data.data, status: response.status, statusText: response.statusText, pageNum: response.data.page, perPage: response.data.per_page, quantity: response.data.total, totalPages: response.data.total_pages };
    } catch (error: any) {
        return { data: error.response.data, status: error.response.status, statusText: error.response.statusText };
    }
}

interface FetchByIdProps {
    id: string | number
}

export async function fetchProductById ({ id }: FetchByIdProps) {
    const url = `products/${id.toString()}`;
    try {
        const response = await api.get(url);
        return { data: [response.data.data], status: response.status, statusText: response.statusText };
    } catch (error: any) {
        return { data: error.response.data, status: error.response.status, statusText: error.response.statusText };
    }
}
