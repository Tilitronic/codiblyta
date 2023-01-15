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
    status: string
    data: ProductObj[]
    error: boolean
    massage: string
}

export interface GetProductsParams {
    page: number
    per_page: number
};

const initialState: ProductsState = {
    status: '',
    data: [],
    error: false,
    massage: ''
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
                const response = action.payload;
                state.status = response.status.toString();
                if (response.status === 200) {
                    state.data = response.data;
                } else {
                    state.error = true;
                    state.massage = response.statusText;
                }
            });
    }

});

export const { clearProductsState } = productsSlice.actions;
export default productsSlice.reducer;
