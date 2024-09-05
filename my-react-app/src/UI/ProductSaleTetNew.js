import React, { useState, useEffect, useCallback } from 'react';
import '../Style/productsaletet.css';
import { getInformationProduct } from './CartNew';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Component Product
const Product = ({ id, Image, name, unit, price, priceSale, note, sale, cart, setCart }) => {
  const navigate = useNavigate();

  // Handle click to add product to cart
  const handleClick = useCallback(() => {
    getInformationProduct({ id, Image, name, unit, price, priceSale, note, sale }, cart, setCart);
  }, [id, Image, name, unit, price, priceSale, note, sale, cart, setCart]);

  // Fetch product details
  const getProductDetail = useCallback(async () => {
    try {
      const url = `http://localhost:8080/api/ProductDetail?Code=${id}`;
      const response = await axios.get(url);
      sessionStorage.setItem("dataProductDetail", JSON.stringify(response.data));
      navigate('/ProductDetail');
    } catch (error) {
      console.error("Error fetching product details:", error);
      alert("Không thể lấy thông tin sản phẩm. Vui lòng thử lại.");
    }
  }, [id, navigate]);

  return (
    sale > 0 && (
      <div className="products__Tet products" key={id} onClick={getProductDetail}>
        <div className="product--image">
          <img className="image--product" src={Image} alt={name} />
          {sale > 0 && <div className="product__discount">{sale}%</div>}
        </div>
        <div className="product__sale--Tet--item">
          <div className="product--name">{name}</div>
          <div className="product--unit">DVT: {unit}</div>
          <div className="product--note">
            <img className="image--note" src={Image} alt={name} />
            <div className="product--note--text">{note}</div>
          </div>
          <div className='product--price--Tet'>
            <div className='product--price--real'>
              {price.toLocaleString('en-US', { maximumFractionDigits: 3 }) + " ₫"}
            </div>
            <div className="product--price--sale">
              {sale ? priceSale.toLocaleString('en-US', { maximumFractionDigits: 3 }) + " ₫" : ""}
            </div>
          </div>
        </div>
        <button className="product--click--add" onClick={handleClick}>
          <i className="fa-solid fa-cart-plus"></i> Thêm vào giỏ hàng
        </button>
      </div>
    )
  );
};

// Component ProductSaleTetNew
const ProductSaleTetNew = ({ cart, setCart }) => {
  const [dataProductSaleTet, setDataProductSaleTet] = useState([]);

  useEffect(() => {
    const fetchDataProductSaleTet = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/Products');
        setDataProductSaleTet(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataProductSaleTet();
  }, []);

  return (
    <div className="product__sale--Tet">
      <div className="product__sale--Tet--title--time">
        <div className='product__sale--Tet--title'>Siêu sale</div>
        <button className='product__sale--Tet--discovery'>Xem thêm</button>
      </div>
      <div className='product__sale--Tet--sell product__today--sell'>
        {dataProductSaleTet.map(product => (
          <Product
            key={product.productId}
            id={product.productId}
            Image={product.productImageLink}
            name={product.productName}
            price={product.productPrice}
            note={product.productNote}
            unit={product.productUnit}
            sale={product.productDiscount}
            priceSale={product.productPrice - (product.productPrice * product.productDiscount / 100)}
            cart={cart}
            setCart={setCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSaleTetNew;
