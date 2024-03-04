import ProductCard from './ProductCard';
import styles from '../styles/productList.module.css';

function ProductList ({products, handleGetProducts}: ProductsResponseWithGet) {

	return (
		(products && products.length) ?
		<div className={styles.productBox}>
			{
				products.map((product: Product) =>{
						return <ProductCard key={product.id} handleGetProducts={handleGetProducts} product={product} />
				})
			}
		</div> : <span>No Products.</span>
	)
}

export default ProductList