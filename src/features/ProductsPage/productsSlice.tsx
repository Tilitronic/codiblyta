import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from '../../api/services/productsService';

export interface ProductObj {
    color: string
    id: number
    name: string
    pantone_value: string
    year: number
}

export interface ProductsState {
    data: ProductObj[]
    page: number
    per_page: number
    total: number
    total_pages: number
    support?: any
}

export interface GetProductsParams {
    page: number
    per_page: number
};

const initialState: ProductsState = {
    data: [],
    page: 0,
    per_page: 0,
    total: 0,
    total_pages: 0,
};

export const getProducts = createAsyncThunk(
    'products/requestStatus',
    async ({ page, per_page }: GetProductsParams = { page: 1, per_page: 5 }) => {
        const response = await fetchProducts({ page, per_page });
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
                state.data = action.payload.data;
                // state.page = action.payload.page;
                // state.per_page = action.payload.per_page;
                // state.total = action.payload.total;
                // state.total_pages = action.payload.total_pages;
            });
    }

});

export const { clearProductsState } = productsSlice.actions;
export default productsSlice.reducer;
