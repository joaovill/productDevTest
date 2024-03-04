interface handleProductFormActions {
	handleOpen: (arg: boolean) => void
	handleGetProducts: (token: string) => void
}
interface handleOrderFormActions extends handleProductFormActions {
	products: Product[]
	handleGetOrders: (token: string) => void
}

interface getProducts {
    handleGetProducts: (token: string) => void
    handleGetOrders: (token: string) => void
	products: Product[]
}