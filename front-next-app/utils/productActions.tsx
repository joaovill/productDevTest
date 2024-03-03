import axios from "axios";

export async function fetchAllProducts(token: string): Promise<ProductsResponse> {
	try {
		const {data} = await axios.get('http://localhost:8000/projects', {
			headers: ({
				Authorization: 'Bearer ' + token
			})
		});

		return {
            products: data
        }
	}catch(e: any){
		console.log(e)
		return {
            products: [],
            error: e.response?.data?.message
        }
	}
}

export async function fetchCreateProduct(token: string, formData: FormData): Promise<ProductResponse> {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
	try {
		const { data } = await axios.post('http://localhost:8000/product', formData, config);

		return {
            product: data
        }
	}catch(e: any){
		console.log(e)
		return {
            product: {
                id: '',
                title: '',
                description: '',
                listPrice: 0,
                stock: 0,
                images: [],
                createdAt: '',
                updatedAt: ''
            },
            error: e.response?.data?.message
        }
	}
}

export async function fetchUpdateProduct(dataProject: UpdateProduct): Promise<ProductResponse> {
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
            product: data
        }
	}catch(e: any){
		console.log(e)
		return {
            product: {
                id: '',
                title: '',
                description:'',
                listPrice: 0,
                stock: 0,
                images: [],
                createdAt: '',
                updatedAt: ''
            },
            error: e.response?.data?.message
        }
	}
}

export async function fetchDeleteProject(dataProject: UpdateProduct): Promise<ProductResponse> {
    const config = {
        headers: { Authorization: `Bearer ${dataProject.token}` }
    };
	try {
		const {data} = await axios.delete(
            'http://localhost:8000/project/' + dataProject.id + '/delete',
			config
		);

		return {
            product: data
        }
	}catch(e: any){
		console.log(e)
		return {
            product: {
                id: '',
                title: '',
                description: '',
                listPrice: 0,
                stock: 0,
                images: [],
                createdAt: '',
                updatedAt: ''
            },
            error: e.response?.data?.message
        }
	}
}