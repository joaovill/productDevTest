import { useState } from 'react';
import { useRouter } from 'next/router';

import { Button, FormControl, TextField } from '@mui/material';

import { fetchRegister } from '@/utils/authToken';
import { usernameMask, nameMask } from '@/utils/validateMasks';

import styles from '../styles/login.module.css';

function RegisterForm ({handleSignUp}: handleSignUp) {
	const router = useRouter()

	const [name, setName] = useState<string>("")
	const [errorName, setErrorName] = useState<boolean>(false)

	const [username, setUsername] = useState<string>("")
	const [errorUsername, setErrorUsername] = useState<boolean>(false)

	const [password, setPassword] = useState<string>("")
	const [errorPassword, setErrorPassword] = useState<boolean>(false)

	const [errorMsg, setErrorMsg] = useState<string>("")
	

	const handleSubmit = async (event: any) =>{
		event.preventDefault()
		
		const tokenData = await fetchRegister({name, username, password});

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
		<form className={styles.loginForm} onSubmit={handleSubmit}>
			<FormControl fullWidth>
				<div className={styles.formItem}>
					<TextField
						onBlur={ e => { handleValidateName(e.target.value) } }
						onChange={ e => { setName(nameMask(e.target.value))} }
						value={name} required id="outlined-name"
						label="Name" variant="outlined"
						type='text' placeholder='Name'
						fullWidth
					/>
					{errorName && <span className={styles.errorMsg}>Please fill with Fullname.</span>}
				</div>
				<div>
					<TextField 
						onBlur={ e => { handleValidateUsername(e.target.value) } } 
						onChange={ e => { setUsername(usernameMask(e.target.value))} } 
						value={username} required id="outlined-user" 
						label="Username" variant="outlined" 
						placeholder='Username' 
						inputProps={{ maxLength: 12 }}
						fullWidth
					/>
					{errorUsername && <span className={styles.errorMsg}>The username must have at least 8 characters (only letters and ". - _") will be accepted.</span>}
				</div>
				<div>
					<TextField
						onBlur={ e => { handleValidatePassword(e.target.value) } }
						onChange={ e => { setPassword(e.target.value)} }
						value={password} required id="outlined-pass"
						label="Password" variant="outlined"
						type='password' placeholder='Password'
						fullWidth
					/>
					{errorPassword && 
						<span className={styles.errorMsg}>
							Password must contain: 
							<span>
							- must be 8 digits length.
							</span>
							<span>
							- at least a Uppercase letter.
							</span>
							<span>
							- at least a lowercase letter.
							</span>
							<span>
							- at least a special character.
							</span>
						</span>
						}
				</div>
				<div className={styles.buttonsLogin}>
					<Button color='secondary' onClick={() => { handleSignUp(true) }}>Back</Button>
					<Button type='submit' disabled={handleDisable()} >Sign Up</Button>
				</div>

				{errorMsg && <span className={styles.errorMsg}>{errorMsg}</span>}
			</FormControl>
		</form>
	)
}

export default RegisterForm