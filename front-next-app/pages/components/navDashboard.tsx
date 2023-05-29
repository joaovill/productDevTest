
import { Box, Button, Modal } from '@mui/material';
import { useState } from 'react';

function NavDashboard () {
	const [open, setOpen] = useState<boolean>(false)

	const handleOpen = (arg: boolean) =>{
		setOpen(arg)
	}
	return (
		<div>
			<Button onClick={() => {handleOpen(true)}}>Create New Project +</Button>

			<Modal open={open} onClose={() => {handleOpen(false)}}>
				<Box>
					<ProjectForm />
				</Box>
			</Modal>
		</div>
	)
}

export default NavDashboard