interface handleProductFormActions {
	handleOpen: (arg: boolean) => void
	handleGetProducts: (token: string) => void
}

interface getProducts {
    handleGetProducts: (token: string) => void
}