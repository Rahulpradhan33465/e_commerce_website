import React, { useState, useEffect } from 'react'
import Cart from './component/Cart/Cart'
import Navbar from './component/Navbar/Navbar'
import Products from './component/Products/Products'
import {CssBaseline} from '@material-ui/core'
import { commerce } from './lib/commerce'
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom'
import CheckOut from './component/CheckOutForm/CheckOut/CheckOut'
const App = () => {
  const[mobileOpen,setMobileOpen]=useState(false);
  const[errorMessage,setErrorMessage]=useState('');
  const [order,setOrder]=useState({})
  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState({})
  const fetchProducts = async () => {
    const myProducts = await commerce.products.list();
    const { data } = myProducts;
    setProduct(data);

  }
  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();

    setCart(cart);
  }
  const refreshCart=async()=>{
const newCart=await commerce.cart.refresh();
setCart(newCart);
  }
  const handelCaptureCheckOut=async (checkOutTookenId,newOrder)=>{
    try {
      const incomingOrder=await commerce.ckeckout.capture(checkOutTookenId,newOrder);
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      console.log(error);
      // setErrorMessage(error.data.error.message);
    }
  };

  const handelCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  }
  const updateQuantity=async (productId,quantity)=>{
      const {cart}=await commerce.cart.update(productId,{quantity});
      setCart(cart);
      
  }
const removeCart=async(productId)=>{
  const{cart}=await commerce.cart.remove(productId);
  setCart(cart);
}
const clearCart=async()=>{
  const {cart}=await commerce.cart.empty();
  setCart(cart);
}

  useEffect(() => {
    fetchProducts();
    fetchCart();

  }, [])
  const handleDrawerToggle=()=>setMobileOpen(!mobileOpen);
  // console.log(cart);
  return (
  <Router>
         <div style={{display:'flex'}}>
           <CssBaseline />
         <Navbar totalItem={cart.total_items} handleDrawerToggle={handleDrawerToggle} />
         <Switch>
           <Route exact path='/'>
           <Products products={product} onAddCart={handelCart} handleUpdateCartQutantity />
           </Route>
           <Route exact path='/cart'>

           <Cart cart={cart} updateQuantity={updateQuantity} removeCart={removeCart} clearCart={clearCart} />
           </Route>
           <Route exact path='/checkOut'>
             <CheckOut cart={cart} order={order} onCheckOut={handelCaptureCheckOut} error={errorMessage} refreshCart={refreshCart}/>
           </Route>
         </Switch>
      
    </div>

  </Router>


  )
}

export default App
