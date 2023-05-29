import { useState } from 'react';
import { useRouter } from 'next/router';

import { Box, Button, FormControl, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { zipCodeMask, titleMask, priceMask } from '@/utils/validateMasks';
import { fetchCreateProject } from '@/utils/projectsActions';

import styles from '../styles/projectForm.module.css';

function ProjectForm ({handleOpen, handleGetProjects}: handleProjectFormActions) {
	const router = useRouter()

	const [title, setTitle] = useState<string>("")
	const [errorTitle, setErrorTitle] = useState<boolean>(false)
	
	const [zipCode, setZipCode] = useState<string>("")
	const [errorZipCode, setErrorZipCode] = useState<boolean>(false)

	const [cost, setCost] = useState<string>("")
	const [errorCost, setErrorCost] = useState<boolean>(false)

	const [deadline, setDate] = useState<string>("")
	const [errorDate, setErrorDate] = useState<boolean>(false)

	const [errorMsg, setErrorMsg] = useState<string>("")
	

	const handleSubmit = async (event: any) =>{
		event.preventDefault()
		
		const tokenData = localStorage.getItem('token');
		console.log(tokenData)
		if(tokenData){
			const zipCodeCleaned = parseInt(zipCode.replace(/\D/g,''));
			const costNumber = parseInt(cost.replace(/\D/g,''));
			
			const dataProject = await fetchCreateProject({token:tokenData, title, cost: costNumber, deadline, zip_code: zipCodeCleaned}).then((res) => {
				if(res.project?.id){
					handleOpen(false)
					handleGetProjects(tokenData)
				}
			})
		}
	}

	/* Maybe to export validations to Utils, but at the time this is using only here so it is not necessary */

	const handleValidateTitle = (title: string) => {
		const titleTest: string | void = title;

		(titleTest) ?
			setErrorTitle(false) : setErrorTitle(true) 
	}

	const handleValidateZipCode = (zipCode: string) => {
		(zipCode.length > 8) ?
			setErrorZipCode(false) : setErrorZipCode(true) 
	}

	const handleValidateCost = (cost: string) => {
		(cost.length > 9) ?
			setErrorCost(false) : setErrorCost(true) 
	}

	const handleDisable = (): boolean => {
		if(!(title && cost && zipCode && deadline) || errorTitle || errorZipCode || errorCost){
			return true
		}else{
			return false
		}
	}

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
							onBlur={ e => { handleValidateZipCode(e.target.value) } } 
							onChange={ e => { setZipCode(zipCodeMask(e.target.value))} } 
							value={zipCode} required id="outlined-zipcode" 
							label="Zip Code" variant="outlined" 
							placeholder='Zip Code' 
							inputProps={{ maxLength: 9 }}
							fullWidth
						/>
						{errorZipCode && <span className={styles.errorMsg}>The zipCode must be in this shape (00000-000).</span>}
					</div>
					<div className={styles.formItem}>
					<TextField 
							onBlur={ e => { handleValidateCost(e.target.value) } } 
							onChange={ e => { setCost(priceMask(e.target.value))} } 
							value={cost} required id="outlined-cost" 
							label="Cost" variant="outlined" 
							placeholder='Cost' 
							inputProps={{ maxLength: 15 }}
							fullWidth
						/>
						{errorCost && <span className={styles.errorMsg}> The minimun budget is $ 1000. </span>}
					</div>
					<div className={styles.formItem}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker value={deadline} onChange={ (e: any) => { setDate(e.$d.toISOString()) }}/>
					</LocalizationProvider>
						{errorDate && <span className={styles.errorMsg}> Date Error. </span>}
					</div>
					
					<Button type='submit' disabled={handleDisable()} >CreateProject</Button>
					{errorMsg && <span className={styles.errorMsg}>{errorMsg}</span>}
				</FormControl>
			</form>
		</Box>
	)
}

export default ProjectForm