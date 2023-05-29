interface handleProjectFormActions {
	handleOpen: (arg: boolean) => void
	handleGetProjects: (token: string) => void
}

interface getProjects {
    handleGetProjects: (token: string) => void
}