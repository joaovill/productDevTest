import { Button, Card } from '@mui/material';

import { priceMask, zipCodeMask } from '@/utils/validateMasks';
import { fetchDeleteProject, fetchUpdateProduct } from '@/utils/productActions';

import styles from '../styles/projectCard.module.css';

function ProductCard ({product, handleGetProducts}: ProductResponseWithGet) {

	const handleDelete = (id: string) =>{
		const authToken = localStorage.getItem('token')
		
		if(authToken){
			fetchDeleteProject({token: authToken, id}).then((res) => {
				console.log(res)
				handleGetProducts(authToken)
			})
		}
	}
	
	const handleEdit = (id: string) =>{
		const authToken = localStorage.getItem('token')
		
		if(authToken){
			fetchUpdateProduct({token: authToken, id}).then((res) => {
				console.log(res)
				handleGetProducts(authToken)
			})
		}
	}

	return (
		<div className={styles.projectCard}>
			<Card>
				<div className={styles.customCard}>
					<div className={styles.headCardProject}>
						<span className={styles.titleProject}>{product.title}</span>
						<span className={styles.costProject}>{priceMask(product.description.toString())}</span>
					</div>
					
					<div className={styles.boxButtons}>
						<Button onClick={() => { handleDelete(product.id)}} color="error">Delete</Button>
						<Button onClick={() => { handleEdit(product.id)}} color="success">Edit</Button>
					</div>
				</div>
			</Card>
		</div>
	)
}

export default ProjectCard