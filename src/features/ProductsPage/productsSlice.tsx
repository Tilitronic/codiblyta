import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProducts, fetchProductById } from '../../api/services/productsService';

export interface ProductObj {
    color: string
    id: number
    name: string
    pantone_value: string
    year: number
}

export interface ProductsState {
    status: string
    data: ProductObj[]
    isError: boolean
    massage: string
    pageNum: number
    perPage: number
    totalPages: number
    quantity: number
}

export interface GetProductsParams {
    page: number
    per_page: number
};

interface GetByIdProps {
    id: string | number
}

const initialState: ProductsState = {
    status: '',
    data: [],
    isError: false,
    massage: '',
    pageNum: 0,
    perPage: 0,
    totalPages: 0,
    quantity: 0
};

export const getProducts = createAsyncThunk(
    'products/requestStatus',
    async ({ page, per_page }: GetProductsParams = { page: 1, per_page: 5 }) => {
        const response = await fetchProducts({ page, per_page });
        return response;
    }
);

export const getProductById = createAsyncThunk(
    'productById/requestStatus',
    async ({ id }: GetByIdProps) => {
        const response = await fetchProductById({ id });
        return response;
    }
);

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearProductsState: (state) => { state = initialState; }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                const response = action.payload;
                state.status = response.status.toString();
                if (response.status === 200) {
                    state.data = response.data;
                    state.pageNum = response.pageNum;
                    state.perPage = response.perPage;
                    state.quantity = response.quantity;
                    state.isError = false;
                    state.massage = '';
                    state.totalPages = response.totalPages;
                } else {
                    state.isError = true;
                    state.massage = response.statusText;
                    state.data = [];
                    state.pageNum = 0;
                    state.perPage = 0;
                    state.quantity = 0;
                    state.totalPages = 0;
                }
            });
        builder
            .addCase(getProductById.fulfilled, (state, action) => {
                const response = action.payload;
                state.status = response.status.toString();
                if (response.status === 200) {
                    state.data = response.data;
                    state.pageNum = 0;
                    state.perPage = 1;
                    state.quantity = 1;
                    state.isError = false;
                    state.massage = '';
                    state.totalPages = 0;
                } else {
                    state.isError = true;
                    state.massage = response.statusText;
                    state.data = [];
                    state.pageNum = 0;
                    state.perPage = 0;
                    state.quantity = 0;
                    state.totalPages = 0;
                }
            });
    }

});

export const { clearProductsState } = productsSlice.actions;
export default productsSlice.reducer;
