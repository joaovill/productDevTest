import { Button, Card } from '@mui/material';

import { priceMask, zipCodeMask } from '@/utils/validateMasks';
import styles from '../styles/projectCard.module.css';
import { fetchDeleteProject, fetchUpdateProject } from '@/utils/projectsActions';

function ProjectCard ({project, handleGetProjects}: ProjectResponseWithGet) {

	const handleDelete = (id: string) =>{
		const authToken = localStorage.getItem('token')
		
		if(authToken){
			fetchDeleteProject({token: authToken, id}).then((res) => {
				console.log(res)
				handleGetProjects(authToken)
			})
		}
	}
	
	const handleDone = (id: string) =>{
		const authToken = localStorage.getItem('token')
		
		if(authToken){
			fetchUpdateProject({token: authToken, id}).then((res) => {
				console.log(res)
				handleGetProjects(authToken)
			})
		}
	}

	return (
		<div className={styles.projectCard}>
			<Card>
				<div className={styles.customCard}>
					<div className={styles.headCardProject}>
						<span className={styles.titleProject}>{project.title}</span>
						<span className={styles.costProject}>{priceMask(project.cost.toString())}</span>
					</div>
					<div>
						<span>
							{zipCodeMask(project.zip_code.toString())}
						</span>
						<span className={styles.deadlineProject}>Deadline: {project.deadline.substring(0, 10)}</span>
					</div>
					<div className={styles.boxButtons}>
						<Button onClick={() => { handleDelete(project.id)}} color="error">Delete</Button>
						{!project.done && <Button onClick={() => { handleDone(project.id)}} color="success">Finish</Button>}
					</div>
				</div>
			</Card>
		</div>
	)
}

export default ProjectCard