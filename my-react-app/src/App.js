import React from 'react';
import { useState, useEffect } from 'react';
import Head from './UI/Head';
import Banner from './UI/Banner';
import Services from './UI/Services';
import ProductTodayNew from './UI/ProductTodayNew';
import ProductSaleTetNew from './UI/ProductSaleTetNew';
import Footer from './UI/Footer';

const App = () => {
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
    <ProductSaleTetNew cart={cart} setCart={setCart} />
    <ProductTodayNew cart ={cart} setCart= {setCart}/>
    <Footer/>
    </div>
    );
  }

export default App;
