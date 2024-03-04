
import { useState } from 'react';

import { Box, Button, Modal } from '@mui/material';

import ProductForm from './ProductForm';

import styles from '../styles/navDashboard.module.css'
import OrderForm from './OrderForm';

function NavDashboard ({handleGetOrders, handleGetProducts, products}: getProducts) {
	const [openProduct, setOpenProduct] = useState<boolean>(false)
	const [openOrder, setOpenOrder] = useState<boolean>(false)

	const handleOpenModalProduct = (arg: boolean) =>{
		setOpenProduct(arg)
	}
	const handleOpenModalOrder = (arg: boolean) =>{
		setOpenOrder(arg)
	}

	return (
		<div>
			<Button onClick={() => {handleOpenModalProduct(true)}}>Create New Product +</Button>
			<Button onClick={() => {handleOpenModalOrder(true)}}>Create New Order +</Button>

			<Modal open={openProduct} onClose={() => {handleOpenModalProduct(false)}}>
				<Box className={styles.modalBox} >
					<span className={styles.titleModal}>Create a New Product</span>
					<ProductForm handleGetProducts={handleGetProducts}  handleOpen={handleOpenModalProduct} />
				</Box>
			</Modal>
			<Modal open={openOrder} onClose={() => {handleOpenModalOrder(false)}}>
				<Box className={styles.modalBox} >
					<span className={styles.titleModal}>Create a New Product</span>
					<OrderForm handleGetOrders={handleGetOrders}  handleOpen={handleOpenModalOrder} products={products} />
				</Box>
			</Modal>
		</div>
	)
}

export default NavDashboard