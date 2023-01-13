import './ProductInfo.css';
import { ProductObj } from '../../productsSlice';
interface ProductInfoProps {
    products: ProductObj []
    id: string | undefined
}
export function ProductInfo ({ products, id }: ProductInfoProps) {
    if (!id) { return null; }
    const product = products.find(obj => obj.id.toString() === id.toString());
    if (!product || !id) { return null; }
    return (
        <div className='productInfo'>
            <h6>Product info</h6>
            {Object.entries(product).map((ent, index) => {
                return (
                    <div className='productInfoUnit' key={index}>
                        <p>{ent[0] + ':'}</p>
                        <p>{ent[1]}</p>
                    </div>
                );
            })}
        </div>
    );
}
