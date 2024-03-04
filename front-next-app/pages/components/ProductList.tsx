import ProductCard from './ProductCard';
import styles from '../styles/productList.module.css';

function ProductList ({products, handleGetProducts}: ProductsResponseWithGet) {

	return (
		(products.length) ?
		<div className={styles.productBox}>
			{
				products.map((product: Product) =>{
						return <ProductCard handleGetProducts={handleGetProducts} product={product} />
				})
			}
		</div> : <span>No Products.</span>
	)
}

export default ProductList