export const usernameMask = (value: string): string => {
	return value.replace(/[^a-zA-Z0-9_-\w.]/g, '')
}

export const nameMask = (value: string): string =>{
	value = value.replace(/[0-9]/g, '')
	value = value.replace(/[^a-zA-Zà-ú~´^ ]/g, '')
	value = value.replace('  ', ' ')

	return value
}

export const titleMask = (value: string): string =>{
	value = value.replace(/[^a-zA-Zà-ú~´^ ]/g, '')
	value = value.replace('  ', ' ')

	return value
}


export const zipCodeMask = (value: string) => {
	if (!value) return ""
	value = value.replace(/\D/g,'')
	value = value.replace(/(\d{5})(\d)/,'$1-$2')
	return value
}

export const priceMask = (value: string) => {
	if (!value) return ""
	value = value.replace(/\D/g,'')
	value = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(
		parseFloat(value) / 100)
	return "$ " + value
  }