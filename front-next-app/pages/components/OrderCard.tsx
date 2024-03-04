import { useState } from 'react';
import { Button, Card, Box, Modal } from '@mui/material';

import { fetchDeleteProduct, fetchUpdateProduct } from '@/utils/productActions';

import styles from '../styles/productCard.module.css'
import { priceMask } from '@/utils/validateMasks';
import { fetchDeleteOrder } from '@/utils/orderActions';

function OrderCard ({order, handleGetOrders}: OrderResponseWithGet) {

	const [open, setOpen] = useState<boolean>(false)

	const handleOpenDelete = (arg: boolean) =>{
		setOpen(arg)
	}

	const handleDelete = (id: string) =>{
		const authToken = localStorage.getItem('token')
		
		if(authToken){
			fetchDeleteOrder({token: authToken, id}).then((res) => {
				console.log(res)
				handleOpenDelete(false)
				handleGetOrders(authToken)
			})
		}
	}
	
	 const handleEdit = (id: string) =>{
		const authToken = localStorage.getItem('token')
		
		/*if(authToken){
			fetchUpdateOrder({token: authToken, id}).then((res) => {
				console.log(res)
				handleGetOrders(authToken)
			})
		} */
	} 

	return (
		<div className={styles.productCard}>
			<Card>
				<div className={styles.customCard}>
					<div className={styles.headCardProduct}>
						<span className={styles.titleProduct}>{order.id}</span>
					</div>
					
					<div className={styles.boxButtons}>
						<Button onClick={() => { handleOpenDelete(true)}} color="error">Delete</Button>
						<Button onClick={() => { handleEdit(order.id)}} color="success">Edit</Button>
					</div>
				</div>
			</Card>
			<Modal open={open} onClose={() => {handleOpenDelete(false)}}>
				<Box className={styles.modalBox} >
					<span className={styles.titleModal}>Are you sure to delete Product?</span>
					<Button onClick={() => { handleDelete(order.id)}} color="error">Yes</Button>
					<Button onClick={() => { handleOpenDelete(false)}} color="error">No</Button>
				</Box>
			</Modal>
		</div>
	)
}

export default OrderCard