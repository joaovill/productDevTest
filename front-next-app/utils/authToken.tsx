import axios from "axios";

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


export async function fetchLogin(username: string, password: string): Promise<AuthToken> {
	try {
		const {data} = await axios.post('http://localhost:8000/login', {username, password});

		return data
	}catch{
		return {
			access_token: ''
		}
	}
}