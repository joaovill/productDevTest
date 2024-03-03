
import { useState } from 'react';

import { Box, Button, Modal } from '@mui/material';

import ProductForm from './ProductForm';

import styles from '../styles/navDashboard.module.css'

function NavDashboard ({handleGetProducts}: getProducts) {
	const [open, setOpen] = useState<boolean>(false)

	const handleOpen = (arg: boolean) =>{
		setOpen(arg)
	}

	return (
		<div>
			<Button onClick={() => {handleOpen(true)}}>Create New Product +</Button>

			<Modal open={open} onClose={() => {handleOpen(false)}}>
				<Box className={styles.modalBox} >
					<span className={styles.titleModal}>Create a New Product</span>
					<ProductForm handleGetProducts={handleGetProducts}  handleOpen={handleOpen} />
				</Box>
			</Modal>
		</div>
	)
}

export default NavDashboard