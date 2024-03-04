import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { middlewareLogged } from "../utils/_middlewareLogged";
import { fetchAllProducts } from "@/utils/productActions";

import NavDashboard from "./components/NavDashboard";
import ProductList from "./components/ProductList";
import OrderList from "./components/OrderList";
import { Button } from '@mui/material';

import styles from './styles/styles.module.css';
import { fetchAllOrders } from "@/utils/orderActions";

export default function Index() {
  
  const router  = useRouter()

  const [isDone, setIsDone] = useState<boolean>(true)
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
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
          fetchAllOrders(authToken).then((response) => {
            console.log(response)
            setOrders(response.orders)
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

  const handleGetOrders = (token: string) => {
    fetchAllOrders(token).then((response) => {
      console.log(response)
      setOrders(response.orders)
    })
  }

  const handleIsDone = (arg: boolean) => {
		setIsDone(arg)
	}

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className={styles.greetingMessage}>
        Hello {user.name}, Welcome to your Product Management APP! 
      </div>
      <div className={styles.containerApp}>
        <div className={styles.navBox}>
          {<NavDashboard handleGetOrders={handleGetOrders} handleGetProducts={handleGetProducts} products={products}/>}
        </div>
        <div className={styles.productsBox}>
          <div className={styles.dashboardBox}>
            <div className={styles.buttonsControl}>
              <Button disabled={isDone} onClick={() => {handleIsDone(true)}}>Products</Button>
              <Button disabled={!isDone} onClick={() => {handleIsDone(false)}}>Orders</Button>
            </div>
            {(isDone) ? <ProductList products={products} handleGetProducts={handleGetProducts}/> : <OrderList handleGetOrders={handleGetOrders} orders={orders} />}
          </div>
        </div>
      </div>
    </main>
  )
}