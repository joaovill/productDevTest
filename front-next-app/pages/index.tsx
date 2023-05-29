import { useEffect, useState } from "react";
import { middlewareLogged } from "../utils/_middlewareLogged";
import { useRouter } from "next/router";
import { fetchAllProjects } from "@/utils/projectsActions";

export default function Index() {
  
  const router  = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
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
      
    </main>
  )
}