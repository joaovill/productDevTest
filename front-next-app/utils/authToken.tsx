import axios, { AxiosError } from "axios";
import Error from "next/error";

export async function fetchUserByToken(token: string): Promise<userData> {
	try {
		const {data} = await axios.get('http://localhost:8000/', {
			headers: ({
				Authorization: 'Bearer ' + token
			})
		});

		return data
	}catch{
		return {
			username: '',
			name: '',
			id: ''
		}
	}
}


export async function fetchLogin(user: fetchUser): Promise<AuthToken> {
	try {
		const {data} = await axios.post('http://localhost:8000/login', user);

		return data
	}catch{
		return {
			access_token: ''
		}
	}
}



export async function fetchRegister(user: registerUser): Promise<AuthToken> {
	try {
		const {data} = await axios.post('http://localhost:8000/register', user);

		return data
	}catch(e: any){
		console.log(e)
		return {
			access_token: '',
			error: e?.response?.data.message
		}
	}
}