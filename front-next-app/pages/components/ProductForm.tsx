import { useState, useRef } from 'react';
import { useRouter } from 'next/router';

import { Box, Button, FormControl, TextField } from '@mui/material';

import { titleMask, priceMask } from '@/utils/validateMasks';
import { fetchCreateProduct } from '@/utils/productActions';

import styles from '../styles/projectForm.module.css';

function ProductForm ({handleOpen, handleGetProducts}: handleProductFormActions) {
	const router = useRouter()

	const [title, setTitle] = useState<string>("")
	const [errorTitle, setErrorTitle] = useState<boolean>(false)
	
	const [description, setDescription] = useState<string>("")
	const [errorDescription, setErrorDescription] = useState<boolean>(false)

	const [listPrice, setListPrice] = useState<string>("")
	const [errorListPrice, setErrorListPrice] = useState<boolean>(false)

	const [stock, setStock] = useState<number>(0)
	const [errorStock, setErrorStock] = useState<boolean>(false)

	const [images, setImages] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

	const [errorMsg, setErrorMsg] = useState<string>("")
	

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	
		const tokenData = localStorage.getItem('token');
		if (tokenData) {
			const formData = new FormData();
			const formattedListPrice = listPrice.replace(/[^0-9,.]+/g, '').replace(',', '.');
			
			formData.append('title', title);
			formData.append('description', description);
			formData.append('listPrice', formattedListPrice);
			formData.append('stock', stock.toString());

			images.forEach((image) => {
				formData.append('images', image);
			});
	
			try {
				const response = await fetchCreateProduct(tokenData, formData);
				if (response.product?.id) {
					handleOpen(false);
					handleGetProducts(tokenData);
				} else {
					setErrorMsg('Failed to create product. Please try again.');
				}
			} catch (error) {
				console.error('Error submitting form:', error);
				setErrorMsg('An error occurred. Please try again.');
			}
		} else {
			setErrorMsg('No authentication token found. Please log in.');
		}
	};

	/* Maybe to export validations to Utils, but at the time this is using only here so it is not necessary */

	const handleValidateTitle = (title: string) => {
		const titleTest: string | void = title;

		(titleTest) ?
			setErrorTitle(false) : setErrorTitle(true) 
	}

	const handleValidateDescription = (description: string) => {
		(description.length) ? setErrorDescription(false) : setErrorDescription(true);
	}

	const handleValidateListPrice = (listPrice: string) => {
		(listPrice.length > 0) ? setErrorListPrice(false) : setErrorListPrice(true);
	}

	const handleDisable = (): boolean => {
		if(!(title && listPrice && stock && description) || errorTitle || errorListPrice || errorDescription){
			return true
		}else{
			return false
		}
	}

	const handleImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setImages(Array.from(event.target.files));
        }
    };

	return (
		<Box>
			<form className={styles.projectForm} onSubmit={handleSubmit}>
				<FormControl>
					<div className={styles.formItem}>
						<TextField
							onBlur={ e => { handleValidateTitle(e.target.value) } }
							onChange={ e => { setTitle(titleMask(e.target.value))} }
							value={title} required id="outlined-title"
							label="Title" variant="outlined"
							type='text' placeholder='Title'
							inputProps={{ maxLength: 18 }}
							fullWidth
						/>
						{errorTitle && <span className={styles.errorMsg}>Please fill a Title.</span>}
					</div>
					<div className={styles.formItem}>
						<TextField 
							onBlur={ e => { handleValidateDescription(e.target.value) } } 
							onChange={ e => { setDescription(e.target.value)} } 
							value={description} required id="outlined-zipcode" 
							label="Description" variant="outlined" 
							placeholder='Description'
							fullWidth
						/>
						{errorDescription && <span className={styles.errorMsg}>The product must have a description.</span>}
					</div>
					<div className={styles.formItem}>
					<TextField 
							onBlur={ e => { handleValidateListPrice(e.target.value) } } 
							onChange={ e => { setListPrice(priceMask(e.target.value))} } 
							value={listPrice} required id="outlined-cost" 
							label="List Price" variant="outlined" 
							placeholder='Cost'
							fullWidth
						/>
						{errorListPrice && <span className={styles.errorMsg}> Product must have a List Price. </span>}
					</div>
					<div className={styles.formItem}>
						<TextField
							onBlur={e => { setStock(Number(e.target.value)) }}
							onChange={e => { setStock(Number(e.target.value)) }}
							value={stock} required id="outlined-stock"
							label="Stock" variant="outlined"
							type='number' placeholder='Stock'
							fullWidth
						/>
						{errorStock && <span className={styles.errorMsg}>Please specify the stock.</span>}
					</div>
					<div className={styles.formItem}>
						<Button
							variant="contained"
							component="label"
							fullWidth
						>
							Upload Images
							<input
								ref={fileInputRef}
								type="file"
								hidden
								multiple
								onChange={handleImagesChange}
							/>
						</Button>
						{images.length > 0 && (
							<div className={styles.uploadPreview}>
								{images.map((file, index) => (
									<span key={index}>{file.name}</span>
								))}
							</div>
						)}
                	</div>
					
					<Button type='submit' disabled={handleDisable()} >CreateProject</Button>
					{errorMsg && <span className={styles.errorMsg}>{errorMsg}</span>}
				</FormControl>
			</form>
		</Box>
	)
}

export default ProductForm