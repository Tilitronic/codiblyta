import { ProductObj } from '../../productsSlice';

interface ProductRowProps extends ProductObj {
    handleModalOpen: (id: number | string) => void
}
export function ProductRow (props: ProductRowProps) {
    return (
        <tr style={{ backgroundColor: props.color }} onClick={() => { props.handleModalOpen(props.id); }}>
            <th>
                <p>{props.id}</p>
            </th>
            <th>
                <p>{props.name}</p>
            </th>
            <th>
                <p>{props.year}</p>
            </th>
        </tr>
    );
}
