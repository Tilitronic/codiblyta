import { ProductObj } from '../../productsSlice';

import Typography from '@mui/material/Typography';
import './ProductInfo.css';

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
            <Typography variant='h6' className='productInfoTitle' sx={{ marginBottom: '20px' }}>Product info</Typography>
            {Object.entries(product).map((ent, index) => {
                return (
                    <div className='productInfoUnit' key={index}>
                        <Typography>{ent[0] + ':'}</Typography>
                        <Typography>{ent[1]}</Typography>
                    </div>
                );
            })}
        </div>
    );
}
