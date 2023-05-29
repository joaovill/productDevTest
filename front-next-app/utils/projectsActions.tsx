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
	try {
		const {data} = await axios.post('http://localhost:8000/project', {
			headers: ({
				Authorization: 'Bearer ' + dataProject.token
			}),
            body: {
                ...dataProject,
                token: undefined
            }
		});

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