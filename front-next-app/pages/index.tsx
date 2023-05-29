import { useEffect, useState } from "react";
import { middlewareLogged } from "../utils/_middlewareLogged";
import { useRouter } from "next/router";
import { fetchAllProjects } from "@/utils/projectsActions";
import NavDashboard from "./components/navDashboard";
import styles from './styles/styles.module.css';

export default function Index() {
  
  const router  = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [user, setUser] = useState<userData>({id: '', username: '', name: ''})
  /* 
  This Effect checks if Token and verify if the token still valid,
  if not the user will be redirected to the login Route 
  */
  useEffect(() => {
    const authToken = localStorage.getItem('token');
    if(authToken){
      middlewareLogged(authToken).then((res) =>{
        if(!res){
          router.push('/login')
        }else{
          setUser({...res})
          fetchAllProjects(authToken).then((response) => {
            console.log('response', response)
            setProjects(response.projects)
          })
        }
      })
    }else{
      router.push('/login')
    }
  },[])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        Hello {user.name}, Welcome to your Project Management APP! 
      </div>
      <div className={styles.containerApp}>
        <div className={styles.navBox}>
          {<NavDashboard />}
        </div>
        <div className="projectsBox">
          {(projects.length)? 'Projects' : 'No Projects'}
        </div>
      </div>
    </main>
  )
}