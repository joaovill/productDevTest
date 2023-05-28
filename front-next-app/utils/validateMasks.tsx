export const usernameMask = (value: string): string => {
	return value.replace(/[^a-zA-Z0-9_-\w.]/g, '')
}

export const nameMask = (value: string): string =>{
	value = value.replace(/[0-9]/g, '')
	value = value.replace(/[^a-zA-Zà-ú~´^ ]/g, '')
	value = value.replace('  ', ' ')

	return value
}