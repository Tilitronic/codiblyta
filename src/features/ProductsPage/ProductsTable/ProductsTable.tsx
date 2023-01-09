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

export function ProductsTable({data}: any){
    const products = data?.data;
    console.log('data', data);

    return(
        <table>
            <thead>
                <tr>
                    <th>
                        <p>id</p>
                    </th>
                    <th>
                        <p>name</p>
                    </th>
                    <th>
                        <p>year</p>
                    </th>
                </tr>
            </thead>
            <tbody>
                {data?.data ? 
                data.data.map((obj: any)=>{
                    return(
                        <tr key={obj.id}>
                            <th>
                                <p>{obj.id}</p>
                            </th>
                            <th>
                                <p>{obj.name}</p>
                            </th>
                            <th>
                                <p>{obj.year}</p>
                            </th>
                        </tr>
                    )
                })
                : null}
            </tbody>
        </table>
    )

}