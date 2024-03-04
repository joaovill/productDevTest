import axios from "axios";

export async function fetchAllOrders(token: string): Promise<OrdersResponse> {
	try {
		const {data} = await axios.get('http://localhost:8000/orders', {
			headers: ({
				Authorization: 'Bearer ' + token
			})
		});

		return {
            orders: data
        }
	}catch(e: any){
		console.log(e)
		return {
            orders: [],
            error: e.response?.data?.message
        }
	}
}

export async function fetchCreateOrder(token: string, selectedProducts: any): Promise<OrderResponse> {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
	try {
		const { data } = await axios.post('http://localhost:8000/orders', {productIds: selectedProducts}, config);

		return {
            order: data
        }
	}catch(e: any){
		console.log(e)
		return {
            order: {
                id: '',
                products: [],
                createdAt: '',
                updatedAt: ''
            },
            error: e.response?.data?.message
        }
	}
}

export async function fetchDeleteOrder(dataOrder: UpdateOrder): Promise<OrderResponse> {
    const config = {
        headers: { Authorization: `Bearer ${dataOrder.token}` }
    };
	try {
		const {data} = await axios.delete(
            'http://localhost:8000/orders/' + dataOrder.id + '/delete',
			config
		);

		return {
            order: data
        }
	}catch(e: any){
		console.log(e)
		return {
            order: {
                id: '',
                products: [],
                createdAt: '',
                updatedAt: ''
            },
            error: e.response?.data?.message
        }
	}
}