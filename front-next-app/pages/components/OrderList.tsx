import ProductCard from './ProductCard';
import styles from '../styles/productList.module.css';
import OrderCard from './OrderCard';

function OrderList ({orders, handleGetOrders}: OrdersResponseWithGet) {
	console.log(orders)
	return (
	 	(orders && orders.length) ? 
		<div className={styles.productBox}>
			{
				orders.map((order: Order) =>{
					return <OrderCard key={order.id} order={order} handleGetOrders={handleGetOrders} />
				})
			}
		</div> : <span>No Orders</span>
	)
}

export default OrderList