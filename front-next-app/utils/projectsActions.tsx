import axios from "axios";

export async function fetchAllProjects(token: string): Promise<ProjectsResponse> {
	try {
		const {data} = await axios.get('http://localhost:8000/projects', {
			headers: ({
				Authorization: 'Bearer ' + token
			})
		});

		return {
            projects: data
        }
	}catch(e: any){
		console.log(e)
		return {
            projects: [],
            error: e.response?.data?.message
        }
	}
}