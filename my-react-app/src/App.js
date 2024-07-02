import React from 'react';
import { useState, useEffect } from 'react';
import Head from './UI/Head';
import Banner from './UI/Banner';
import Services from './UI/Services';
import ProductTodayNew from './UI/ProductTodayNew';
import ProductSaleTetNew from './UI/ProductSaleTetNew';
import CartNew from './UI/CartNew';
import './Style/body.css'

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    return savedCart || [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
    <Head />
    <Services />
    <Banner />
    <ProductTodayNew cart ={cart} setCart= {setCart}/>
    <ProductSaleTetNew cart={cart} setCart={setCart} />
    <CartNew cart={cart} setCart={setCart} />
    </div>
    );
  }

export default App;
