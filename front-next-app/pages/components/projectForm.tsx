import { fetchRegister } from '@/utils/authToken';
import { usernameMask, nameMask } from '@/utils/validateMasks';
import { Box, Button, FormControl, TextField } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { DatePicker } from '@mui/x-date-pickers';

function ProjectForm () {
	const router = useRouter()

	const [title, setTitle] = useState<string>("")
	const [errorTitle, setErrorTitle] = useState<boolean>(false)
	
    const [zipCode, setZipCode] = useState<string>("")
	const [errorZipCode, setErrorZipCode] = useState<boolean>(false)

    const [cost, setCost] = useState<number>(0)
	const [errorCost, setCostError] = useState<boolean>(false)

	const [date, setDate] = useState<Date>(new Date())
	const [errorDate, setDateError] = useState<boolean>(false)

	const [errorMsg, setErrorMsg] = useState<string>("")
	

	const handleSubmit = async (event: any) =>{
		event.preventDefault()
		
		const tokenData = await fetchRegister({title, cost, date, zipCode});

		if(tokenData.access_token){
			localStorage.setItem('token', tokenData.access_token);
			router.push('/')
		}else if(tokenData.error){
			setErrorMsg(tokenData.error)
		}
	}

	/* Maybe to export validations to Utils, but at the time this is using only here so it is not necessary */

	const handleValidateName = (name: string) => {
		const nameSplitted: string[] | void = name.split(' ');

		(nameSplitted.length > 1 && nameSplitted[1].length > 1) ?
			setErrorName(false) : setErrorName(true) 
	}

	const handleValidateUsername = (username: string) => {
		(username.length > 7) ?
			setErrorUsername(false) : setErrorUsername(true) 
	}

	const handleValidatePassword = (password: string) => {
		(password.match(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/) && password.length > 7) ?
			setErrorPassword(false) : setErrorPassword(true) 
	}

	const handleDisable = (): boolean => {
		if(!(name && password && username) || errorName || errorPassword || errorUsername){
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
							onBlur={ e => { handleValidateName(e.target.value) } }
							onChange={ e => { setTitle(nameMask(e.target.value))} }
							value={title} required id="outlined-title"
							label="Title" variant="outlined"
							type='text' placeholder='Title'
						/>
						{errorTitle && <span className='error-msg'>Please fill a Title.</span>}
					</div>
					<div>
						<TextField 
							onBlur={ e => { handleValidateUsername(e.target.value) } } 
							onChange={ e => { setZipCode(usernameMask(e.target.value))} } 
							value={zipCode} required id="outlined-zipcode" 
							label="Username" variant="outlined" 
							placeholder='Username' 
							inputProps={{ maxLength: 12 }}
						/>
						{errorZipCode && <span className='error-msg'>The zipCode must be in this shape (00000-000).</span>}
					</div>
					<div>
                        <DatePicker />
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