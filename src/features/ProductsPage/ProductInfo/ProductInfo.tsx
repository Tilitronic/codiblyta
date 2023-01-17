import Typography from '@mui/material/Typography';
import { ProductObj } from '../productsSlice';

interface ProductInfoProps {
  products: ProductObj []
  id: string | undefined
}
export function ProductInfo({ products, id }: ProductInfoProps) {
  if (!id) { return null; }
  const product = products.find((obj) => obj.id.toString() === id.toString());
  if (!product || !id) { return null; }
  return (
    <div style={styles.productInfo}>
      <Typography variant="h6" sx={styles.productInfoTitle}>Product info</Typography>
      {Object.entries(product).map((ent) => (
        <div style={styles.productInfoUnit} key={id}>
          <Typography>{`${ent[0]}:`}</Typography>
          <Typography>{ent[1]}</Typography>
        </div>
      ))}
    </div>
  );
}

const styles = {
  productInfoUnit: {
    display: 'flex',
    width: '200px',
    justifyContent: 'space-between',
    fontSize: '15px',
  },

  productInfo: {
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productInfoTitle: {
    marginBottom: '20px'
  }
};
