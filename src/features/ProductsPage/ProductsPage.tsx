import { getProducts } from "../../api/services/productsService"
import { useEffect, useState } from "react"
import { ProductsTable
 } from "./ProductsTable/ProductsTable"

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

export function ProductsPage(){
    const [data, setData] = useState<any>(null)

    useEffect(()=>{
       getProducts({page: 0, per_page: 5}).then(data=>setData(data))
       
    }, [])

    return (
        <div>
            {data ? 
                <ProductsTable data={data}/>
            : null}
            
        </div>
    )
}