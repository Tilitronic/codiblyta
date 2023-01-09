import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { getProducts } from '../../api/services/productsService';

interface ProductObj {
    color: string,
    id: number,
    name: string,
    antone_value: string,
    year: number,
}

export interface ProductsState {
    data: [ProductObj] | null,
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    support?: any
}
const initialState: ProductsState ={
    data: null,
    page: 0,
    per_page: 0,
    total: 0,
    total_pages: 0,
}
export const getProductsThunk = createAsyncThunk(
    async ({page, pages})=>{
        const response = await getProducts(params)
    }
)

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        clearProductsState: ((state)=>state=initialState)
    },
    extraReducers: (builder) => {
        builder.
            addCase()
    
    }

})