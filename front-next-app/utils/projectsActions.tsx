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


export async function fetchCreateProject(dataProject: CreateProject): Promise<ProjectResponse> {
    console.log(dataProject)
    const config = {
        headers: { Authorization: `Bearer ${dataProject.token}` }
    };
    const bodyParams = {
        ...dataProject,
            token: undefined
        }
	try {
		const {data} = await axios.post(
            'http://localhost:8000/project', 
            bodyParams,
			config
		);

		return {
            project: data
        }
	}catch(e: any){
		console.log(e)
		return {
            project: {
                id: '',
                title: '',
                zip_code: 0,
                cost: 0,
                done: false,
                deadline: '',
                created_at: '',
                updated_at: '',
                username: ''
            },
            error: e.response?.data?.message
        }
	}
}