import axios from "axios";

type ProductObj = {
    color: string,
    id: number,
    name: string,
    antone_value: string,
    year: number,
}

type ProductsTableProps = {
    data: [ProductObj],
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    support?: any

}

export type GetProductsParams = {
    page: number,
    per_page: number
}

export async function getProducts({page, per_page}: GetProductsParams = {page: 0, per_page: 5}){
    const url = `https://reqres.in/api/products?page=${page}&per_page=${per_page}`;
    try{
        const response = await axios.get(url);
        console.log('Products: ', response.data)
        return response.data
    }
    catch(error){
        console.log('Products request failed:', error);
      }
}