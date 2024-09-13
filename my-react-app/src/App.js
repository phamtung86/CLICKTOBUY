import React from 'react';
import { useState, useEffect } from 'react';
import Head from './UI/Head';
import Banner from './UI/Banner';
import Services from './UI/Services';
import ProductTodayNew from './UI/ProductTodayNew';
import ProductSale from './UI/ProductSale';
import Footer from './UI/Footer';
import ProductMilk from './UI/ProductMilk';
import ProductVegetable from './UI/ProductVegetable';
import ProductCleanChemical from './UI/ProductCleanChemical';
import ProductTakeCare from './UI/ProductTakeCare';

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
    <ProductSale cart={cart} setCart={setCart} />
    <ProductTodayNew cart ={cart} setCart= {setCart}/>
    <ProductMilk  cart ={cart} setCart= {setCart}/>
    <ProductVegetable cart ={cart} setCart= {setCart}/>
    <ProductCleanChemical cart ={cart} setCart= {setCart}/>
    <ProductTakeCare cart ={cart} setCart= {setCart}/>
    <Footer/>
    </div>
    );
  }

export default App;
