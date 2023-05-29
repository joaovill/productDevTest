import { useState } from 'react';
import { useRouter } from 'next/router';

import { Button, FormControl, TextField } from '@mui/material';

import { fetchLogin } from '@/utils/authToken';
import { usernameMask } from '@/utils/validateMasks';

import styles from '../styles/login.module.css';

function LoginForm ({handleSignUp}: handleSignUp) {
	const router = useRouter()

	const [username, setUsername] = useState<string>("")
	const [password, setPassword] = useState<string>("")

	const [errorMsg, setErrorMsg] = useState<string>("")

	const handleSubmit = async (event: any) =>{
		event.preventDefault()
		
		const tokenData = await fetchLogin({username, password});

		if(tokenData.access_token){
			console.log('tokenData', tokenData)
			localStorage.setItem('token', tokenData.access_token);
			router.push('/')
		}else if(tokenData.error){
			setErrorMsg(tokenData.error)
		}
	}

	return (
			<form className={styles.loginForm} onSubmit={handleSubmit}>
				<FormControl fullWidth>
					<div className={styles.formItem}>
						<TextField onChange={ e => { setUsername(usernameMask(e.target.value))} } value={username} required id="outlined-user" label="Username" variant="outlined" placeholder='Username' fullWidth/>
					</div>
					<div className={styles.formItem}>
						<TextField onChange={ e => { setPassword(e.target.value)} } value={password} required id="outlined-pass" label="Password" variant="outlined" type='password' placeholder='Password' fullWidth/>
					</div>
					
					<div className={styles.buttonsLogin}>
						<Button type='submit'>Log In</Button>
						<Button onClick={() => { handleSignUp(false) }}>Sign Up</Button>
					</div>

					{errorMsg && <span className={styles.errorMsg}>{errorMsg}</span>}
				</FormControl>
			</form>
	)
}

export default LoginForm