import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { middlewareLogged } from "../utils/_middlewareLogged";
import { fetchAllProducts } from "@/utils/productActions";

import NavDashboard from "./components/NavDashboard";
import ProductList from "./components/ProductList";

import styles from './styles/styles.module.css';

export default function Index() {
  
  const router  = useRouter()
  const [products, setProducts] = useState<Product[]>([])
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
          fetchAllProducts(authToken).then((response) => {
            setProducts(response.products)
          })
        }
      })
    }else{
      router.push('/login')
    }
  },[])

  const handleGetProducts = (token: string) => {
    fetchAllProducts(token).then((response) => {
      console.log(response)
      setProducts(response.products)
    })
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className={styles.greetingMessage}>
        Hello {user.name}, Welcome to your Project Management APP! 
      </div>
      <div className={styles.containerApp}>
        <div className={styles.navBox}>
          {<NavDashboard handleGetProducts={handleGetProducts}/>}
        </div>
        <div className={styles.projectsBox}>
          {(products.length)? <ProductList products={products} handleGetProducts={handleGetProducts}/> : 'No Products'}
        </div>
      </div>
    </main>
  )
}