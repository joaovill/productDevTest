import { Button } from '@mui/material';
import { useState } from 'react';

import ProductCard from './ProductCard';
import styles from '../styles/productList.module.css';

function ProductList ({products, handleGetProducts}: ProductsResponseWithGet) {
	const [isDone, setIsDone] = useState<boolean>(false)

	const handleIsDone = (arg: boolean) => {
		setIsDone(arg)
	}

	return (
		<div className={styles.dashboardBox}>
			<div className={styles.buttonsControl}>
				<Button disabled={!isDone} onClick={() => {handleIsDone(false)}}>Products</Button>
				<Button disabled={isDone} onClick={() => {handleIsDone(true)}}>Orders</Button>
			</div>
			<div className={styles.productBox}>
				{
					products.map((product: Product) =>{
							return <ProductCard handleGetProducts={handleGetProducts} product={product} />
					})
				}
			</div>
		</div>
	)
}

export default ProductList