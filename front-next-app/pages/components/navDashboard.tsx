
import { Box, Button, Modal } from '@mui/material';
import ProjectForm from './ProjectForm';
import { useState } from 'react';
import styles from '../styles/navDashboard.module.css'

function NavDashboard ({handleGetProjects}: getProjects) {
	const [open, setOpen] = useState<boolean>(false)

	const handleOpen = (arg: boolean) =>{
		setOpen(arg)
	}

	return (
		<div>
			<Button onClick={() => {handleOpen(true)}}>Create New Project +</Button>

			<Modal open={open} onClose={() => {handleOpen(false)}}>
				<Box className={styles.modalBox} >
					<span className={styles.titleModal}>Create a New Project</span>
					<ProjectForm handleGetProjects={handleGetProjects}  handleOpen={handleOpen} />
				</Box>
			</Modal>
		</div>
	)
}

export default NavDashboard