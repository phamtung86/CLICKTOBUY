import React from 'react';
import { useState, useEffect } from 'react';
import Head from './UI/Customer/Head';
import Banner from './UI/Customer/Banner';
import Services from './UI/Customer/Services';
import ProductTodayNew from './UI/Customer/ProductTodayNew';
import ProductSale from './UI/Customer/ProductSale';
import Footer from './UI/Customer/Footer';
import ProductMilk from './UI/Customer/ProductMilk';
import ProductVegetable from './UI/Customer/ProductVegetable';
import ProductCleanChemical from './UI/Customer/ProductCleanChemical';
import ProductTakeCare from './UI/Customer/ProductTakeCare';

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
