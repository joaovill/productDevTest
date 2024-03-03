import { Button } from '@mui/material';
import { useState } from 'react';

import ProductCard from './ProductCard';
import styles from '../styles/projectList.module.css';

function ProductList ({products, handleGetProducts}: ProductsResponseWithGet) {
	const [isDone, setIsDone] = useState<boolean>(false)

	const handleIsDone = (arg: boolean) => {
		setIsDone(arg)
	}

	return (
		<div className={styles.dashboardBox}>
			<div className={styles.buttonsControl}>
				<Button disabled={!isDone} onClick={() => {handleIsDone(false)}}>On Going Projects</Button>
				<Button disabled={isDone} onClick={() => {handleIsDone(true)}}>Finished Projects</Button>
			</div>
			<div className={styles.projectBox}>
				{
					products.map((project: Product) =>{
							return <ProductCard handleGetProducts={handleGetProducts} product={product} />
					})
				}
			</div>
		</div>
	)
}

export default ProjectList