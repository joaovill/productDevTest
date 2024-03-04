import { useState } from 'react';
import { Button, Card, Box, Modal } from '@mui/material';

import { fetchDeleteProduct, fetchUpdateProduct } from '@/utils/productActions';

import styles from '../styles/productCard.module.css'
import { priceMask } from '@/utils/validateMasks';

function ProductCard ({product, handleGetProducts}: ProductResponseWithGet) {

	const [open, setOpen] = useState<boolean>(false)

	const handleOpenDelete = (arg: boolean) =>{
		setOpen(arg)
	}

	const handleDelete = (id: string) =>{
		const authToken = localStorage.getItem('token')
		
		if(authToken){
			fetchDeleteProduct({token: authToken, id}).then((res) => {
				console.log(res)
				handleOpenDelete(false)
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
		<div className={styles.productCard}>
			<Card>
				<div className={styles.customCard}>
					<div className={styles.headCardProduct}>
						<span className={styles.titleProduct}>{product.title}</span>
						<span className={styles.costProduct}>{priceMask(product.listPrice.toString())}</span>
					</div>
					<div>

						<span className={styles.costProduct}>{product.description.toString()}</span>
					</div>
					
					<div className={styles.boxButtons}>
						<Button onClick={() => { handleOpenDelete(true)}} color="error">Delete</Button>
						<Button onClick={() => { handleEdit(product.id)}} color="success">Edit</Button>
					</div>
				</div>
			</Card>
			<Modal open={open} onClose={() => {handleOpenDelete(false)}}>
				<Box className={styles.modalBox} >
					<span className={styles.titleModal}>Are you sure to delete Product?</span>
					<Button onClick={() => { handleDelete(product.id)}} color="error">Yes</Button>
					<Button onClick={() => { handleOpenDelete(false)}} color="error">No</Button>
				</Box>
			</Modal>
		</div>
	)
}

export default ProductCard