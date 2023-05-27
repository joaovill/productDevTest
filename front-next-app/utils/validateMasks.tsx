export const usernameMask = (value: string): string => {
	return value.replace(/[^a-zA-Z0-9_-\w.]/g, '')
}

export const nameMask = (value: string): string =>{
	return value.replace(/^[a-záàâãéèêíïóôõöúçñ]{2,}(\s[a-záàâãéèêíïóôõöúçñ]{2,})+$/i, '')
}