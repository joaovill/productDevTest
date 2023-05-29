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

export async function fetchUpdateProject(dataProject: UpdateProject): Promise<ProjectResponse> {
    const config = {
        headers: { Authorization: `Bearer ${dataProject.token}` }
    };
	try {
		const {data} = await axios.patch(
            'http://localhost:8000/project/' + dataProject.id + '/done',
			{},
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

export async function fetchDeleteProject(dataProject: UpdateProject): Promise<ProjectResponse> {
    const config = {
        headers: { Authorization: `Bearer ${dataProject.token}` }
    };
	try {
		const {data} = await axios.delete(
            'http://localhost:8000/project/' + dataProject.id + '/delete',
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