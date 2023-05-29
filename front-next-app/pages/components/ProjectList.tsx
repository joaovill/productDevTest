import { Button } from '@mui/material';
import { useState } from 'react';

import ProjectCard from './ProjectCard';
import styles from '../styles/projectList.module.css';

function ProjectList ({projects, handleGetProjects}: ProjectsResponseWithGet) {
	const [isDone, setIsDone] = useState<boolean>(false)

	const handleIsDone = (arg: boolean) => {
		setIsDone(arg)
	}

	return (
		<div className={styles.dashboardBox}>
			<div className={styles.buttonsControl}>
				<Button disabled={!isDone} onClick={() => {handleIsDone(false)}}>On Going Projects</Button>
				<Button disabled={isDone} onClick={() => {handleIsDone(true)}}>Finished Projects</Button>
			</div>
			<div className={styles.projectBox}>
				{
					projects.map((project: Project) =>{
						if(isDone === project.done){
							return <ProjectCard handleGetProjects={handleGetProjects} project={project} />
						}
					})
				}
			</div>
		</div>
	)
}

export default ProjectList