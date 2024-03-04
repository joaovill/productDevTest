import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

import { middlewareLogged } from "../utils/_middlewareLogged";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

import styles from './styles/login.module.css';
import { Card } from "@mui/material";

function Login() {

  const router  = useRouter()
  /* 
  This Effect checks if Token, 
  if this client have a valid Token automatically send the user to Index Route
  */
  useEffect(() => {
    const authToken = localStorage.getItem('token');

    if(authToken){
      middlewareLogged(authToken).then((res) =>{
        if(res){
          console.log(res)
          router.push('/')
        }
      })
    }
  },[])

  const [isLogin, setIsLogin] = useState<boolean>(true)

  const handleSignUp = (arg: boolean) => {
		setIsLogin(arg)
	}

  return (
    <main className="login-page">
      <div className={styles.boxForms}>
        <Card>
          <div className={styles.titleLogin}>
            <span>PRODUCT MANAGEMENT</span>
          </div>
          {(isLogin) ? <LoginForm handleSignUp={handleSignUp} /> : <RegisterForm handleSignUp={handleSignUp} />}
        </Card>
      </div>
    </main>
  )
}

export default Login