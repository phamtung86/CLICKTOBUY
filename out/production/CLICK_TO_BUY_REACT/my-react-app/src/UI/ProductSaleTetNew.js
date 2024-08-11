import React, { useState, useEffect } from 'react';
import '../Style/productsaletet.css';
import { getInformationProduct } from './CartNew';
import axios from 'axios';

const Product = ({ id, image, name, unit, price, priceSale, note, sale, cart, setCart }) => {
  const handleClick = () => {
    getInformationProduct({ id, image, name, unit, price, priceSale, note, sale }, cart, setCart);
  };

  return (
    <div className="products__Tet products" key={id}>
      <div className="product--image">
        <img className="image--product" src={image} alt={name} />
        {sale && <div className="product__discount">{sale}%</div>}
      </div>
      <div className="product__sale--Tet--item">
        <div className="product--name">{name}</div>
        <div className="product--unit">DVT: {unit}</div>
        <div className="product--note">
          <img className="image--note" src={image} alt={name} />
          <div className="product--note--text">{note}</div>
        </div>
        <div className='product--price--Tet'>
        <div className='product--price--real'>{(sale) ? price.toLocaleString('en-US',{maximumFractionDigits : 3}) + " ₫": price.toLocaleString('en-US',{maximumFractionDigits : 3}) + " ₫" }</div>
        <div className="product--price--sale">{(sale) ? priceSale.toLocaleString('en-US',{maximumFractionDigits : 3}) + " ₫": priceSale.toLocaleString('en-US',{maximumFractionDigits : 3}) + " ₫" }</div>
        </div>
      </div>
      <button className="product--click--add" onClick={handleClick}>
        <i className="fa-solid fa-cart-plus"></i> Thêm vào giỏ hàng
      </button>
    </div>
  );
};

const ProductSaleTetNew = ({cart,setCart}) => {
  const [dataProductSaleTet, setDataProductSaleTet] = useState([]);
  useEffect(() => {
    const fetchDataProductSaleTet = async () => {
      try {
        const responseDataProductSaleTet = await axios.get('http://localhost:5003/api/productsaletet');
        setDataProductSaleTet(responseDataProductSaleTet.data.data.data)
      } catch (error) {
        console.error("Error fetching data: " + error)
      }
    }
    fetchDataProductSaleTet();
  },[])


  return (
    <div className="product__sale--Tet">
      <div className="product__sale--Tet--title--time">
        <div className='product__sale--Tet--title'>Tết siêu sale</div>
        <button className='product__sale--Tet--discovery'>Xem thêm</button>
      </div>
      <div className='product__sale--Tet--sell product__today--sell'>
        {dataProductSaleTet.map(product => 
          <Product 
            key={product.id}
            {...product}
            priceSale={(product.price - (product.price * product.sale / 100))}
            cart={cart}
            setCart={setCart}
          />
        )}
      </div>
    </div>
  );
};

export default ProductSaleTetNew;
