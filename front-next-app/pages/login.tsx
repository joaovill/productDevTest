import { middlewareLogged } from "../utils/_middlewareLogged";
import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import { useRouter } from 'next/router';
import RegisterForm from "./components/RegisterForm";

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
      {(isLogin) ? <LoginForm handleSignUp={handleSignUp} /> : <RegisterForm handleSignUp={handleSignUp} />}
    </main>
  )
}

export default Login