import axios from "axios";

export async function fetchAllProducts(token: string): Promise<ProductsResponse> {
	try {
		const {data} = await axios.get('http://localhost:8000/products', {
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
		const { data } = await axios.post('http://localhost:8000/products', formData, config);

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

export async function fetchUpdateProduct(dataProduct: UpdateProduct): Promise<ProductResponse> {
    const config = {
        headers: { Authorization: `Bearer ${dataProduct.token}` }
    };
	try {
		const {data} = await axios.patch(
            'http://localhost:8000/products/' + dataProduct.id + '/done',
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

export async function fetchDeleteProduct(dataProduct: UpdateProduct): Promise<ProductResponse> {
    const config = {
        headers: { Authorization: `Bearer ${dataProduct.token}` }
    };
	try {
		const {data} = await axios.delete(
            'http://localhost:8000/products/' + dataProduct.id + '/delete',
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