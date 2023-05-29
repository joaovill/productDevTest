import { zipCodeMask, nameMask } from '@/utils/validateMasks';
import { Box, Button, FormControl, TextField } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { fetchCreateProject } from '@/utils/projectsActions';

function ProjectForm () {
	const router = useRouter()

	const [title, setTitle] = useState<string>("")
	const [errorTitle, setErrorTitle] = useState<boolean>(false)
	
  const [zipCode, setZipCode] = useState<string>("")
	const [errorZipCode, setErrorZipCode] = useState<boolean>(false)

  const [cost, setCost] = useState<number>(0)
	const [errorCost, setCostError] = useState<boolean>(false)

	const [deadline, setDate] = useState<string>("")
	const [errorDate, setDateError] = useState<boolean>(false)

	const [errorMsg, setErrorMsg] = useState<string>("")
	

	const handleSubmit = async (event: any) =>{
		event.preventDefault()
		
		const tokenData = localStorage.getItem('token');
			if(tokenData){
				const dataProject = await fetchCreateProject({token:tokenData, title, cost, deadline, zip_code: zipCode}).then((res) => {
					console.log(res)
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

	const handleDisable = (): boolean => {
		if(!(title && cost && zipCode && deadline) || errorTitle || errorZipCode || errorCost){
			return true
		}else{
			return false
		}
	}

	return (
		<Box component="div" sx={{ p: 2, border: '1px dashed grey' }}>
			<form onSubmit={handleSubmit}>
				<FormControl>
					<div>
						<TextField
							onBlur={ e => { handleValidateTitle(e.target.value) } }
							onChange={ e => { setTitle(nameMask(e.target.value))} }
							value={title} required id="outlined-title"
							label="Title" variant="outlined"
							type='text' placeholder='Title'
						/>
						{errorTitle && <span className='error-msg'>Please fill a Title.</span>}
					</div>
					<div>
						<TextField 
							onBlur={ e => { handleValidateZipCode(e.target.value) } } 
							onChange={ e => { setZipCode(zipCodeMask(e.target.value))} } 
							value={zipCode} required id="outlined-zipcode" 
							label="Zip Code" variant="outlined" 
							placeholder='Zip Code' 
							inputProps={{ maxLength: 9 }}
						/>
						{errorZipCode && <span className='error-msg'>The zipCode must be in this shape (00000-000).</span>}
					</div>
					<div>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={deadline} onChange={ (e: any) => { setDate(e.$d.toISOString()) }}/>
					</LocalizationProvider>
						{errorDate && <span className='error-msg'> Date Error. </span>}
					</div>
					
					<Button type='submit' disabled={handleDisable()} >CreateProject</Button>
					{errorMsg}
				</FormControl>
			</form>
		</Box>
	)
}

export default ProjectForm