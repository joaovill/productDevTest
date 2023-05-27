import { middlewareLogged } from "./_middlewareLogged";
import { useEffect, useState } from "react";
import LoginForm from "./components/loginForm";
import { useRouter } from 'next/router';
import RegisterForm from "./components/registerForm";

function Login() {

  const router  = useRouter()

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
    <main className="">
      {(isLogin) ? <LoginForm handleSignUp={handleSignUp} /> : <RegisterForm handleSignUp={handleSignUp} />}
    </main>
  )
}

export default Login