import { fetchLogin } from '@/utils/authToken';
import { usernameMask } from '@/utils/validateMasks';
import { Box, Button, FormControl, TextField } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';

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
		<Box component="div" sx={{ p: 2, border: '1px dashed grey' }}>
			<form onSubmit={handleSubmit}>
				<FormControl>
					<TextField onChange={ e => { setUsername(usernameMask(e.target.value))} } value={username} required id="outlined-user" label="Username" variant="outlined" placeholder='Username'/>
					<TextField onChange={ e => { setPassword(e.target.value)} } value={password} required id="outlined-pass" label="Password" variant="outlined" type='password' placeholder='Password' />
					
					<Button type='submit'>Log In</Button>
					<Button onClick={() => { handleSignUp(false) }}>Sign Up</Button>

					{errorMsg}
				</FormControl>
			</form>
		</Box>
	)
}

export default LoginForm