import { fetchRegister } from '@/utils/authToken';
import { usernameMask, nameMask } from '@/utils/validateMasks';
import { Box, Button, FormControl, TextField } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';

function RegisterForm ({handleSignUp}: handleSignUp) {
	const router = useRouter()
	const [username, setUsername] = useState<string>("")
	const [name, setName] = useState<string>("")
	const [password, setPassword] = useState<string>("")

	const handleSubmit = async (event: any) =>{
		event.preventDefault()
		
		const tokenData = await fetchRegister({name, username, password});

		if(tokenData.access_token){
			localStorage.setItem('token', tokenData.access_token);
			router.push('/')
		}
	}

	return (
		<Box component="div" sx={{ p: 2, border: '1px dashed grey' }}>
			<form onSubmit={handleSubmit}>
				<FormControl>
					<TextField onChange={ e => { setName(nameMask(e.target.value))} } value={name} required id="outlined-name" label="Name" variant="outlined" type='text' placeholder='Name' />
					<TextField onChange={ e => { setUsername(usernameMask(e.target.value))} } value={username} required id="outlined-user" label="Username" variant="outlined" placeholder='Username'/>
					<TextField onChange={ e => { setPassword(e.target.value)} } value={password} required id="outlined-pass" label="Password" variant="outlined" type='password' placeholder='Password' />
					
					<Button onClick={() => { handleSignUp(true) }}>Back</Button>
					<Button type='submit'>Sign Up</Button>
				</FormControl>
			</form>
		</Box>
	)
}

export default RegisterForm