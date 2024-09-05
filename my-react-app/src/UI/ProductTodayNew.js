import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountdownTime from './CountdownTime'; // Import CountdownTimer
import '../Style/producttoday.css';
import { getInformationProduct } from './CartNew';
import { useNavigate } from 'react-router-dom';

const Product = ({ id, Image, name, unit, price, priceSale, note, sale, cart, setCart }) => {
  const navigate = useNavigate();

  const getProductDetail = async () => {
    try {
      const url = `http://localhost:8080/api/ProductDetail?Code=${id}`;
      
      const response = await axios.get(url, {
        action : "getProductDetail"
      });
      console.log(response);
      sessionStorage.setItem("dataProductDetail", JSON.stringify(response.data));
      navigate('/ProductDetail');
    } catch (error) {
      console.error("Error fetching product details:", error);
      alert("Không thể lấy thông tin sản phẩm. Vui lòng thử lại.");
    }
  };

  const handleClick = () => {
    getInformationProduct({ id, Image, name, unit, price, priceSale, note, sale }, cart, setCart);
  };

  return (
    <>
      {sale === 0 && (
        <div className="products" key={id} onClick={getProductDetail}>
          <div className="product--image">
            <img className="image--product" src={Image} alt="San pham hom nay" />
            <div className={sale ? "product__discount" : "product__discount__none"}>{sale}</div>
          </div>
          <div className="product--item">
            <div className="product--name">{name}</div>
            <div className="product--unit">DVT: {unit}</div>
            <div className="product--note">
              <img className="image--note" src={Image} alt="Hinh anh san pham" />
              <div className="product--note--text">{note}</div>
            </div>
            <div className='product--price'>
              <div className='product__today--price--real'>
                {price.toLocaleString('en-US', { maximumFractionDigits: 3 }) + " ₫"}
              </div>
              <div className="product__today--price--sale">
                {sale ? priceSale.toLocaleString('en-US', { maximumFractionDigits: 3 }) + " ₫" : ""}
              </div>
            </div>
          </div>
          <button className="product--click--add" onClick={handleClick}>
            <i className="fa-solid fa-cart-plus"></i> Thêm vào giỏ hàng
          </button>
        </div>
      )}
    </>
  );
};

const ProductTodayNew = ({ cart, setCart }) => {
  const [dataProductToday, setDataProductToday] = useState([]);
  const targetDate = new Date(2024, 11, 20, 12, 0, 0, 0);
  targetDate.setHours(targetDate.getHours() + 1);

  useEffect(() => {
    const fetchDataProductToday = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/Products');
        setDataProductToday(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Không thể lấy dữ liệu sản phẩm. Vui lòng thử lại.");
      }
    };
    fetchDataProductToday();
  }, []);

  return (
    <div className="product__today">
      <div className="product__today--title--time">
        <div className="product__today--title">Duy nhất hôm nay</div>
        <div className="product__today--time">
          <span className="product__today--time--text">Kết thúc trong</span>
          <CountdownTime targetDate={targetDate} />
        </div>
      </div>
      <div className='product__today--sell'>
        {dataProductToday.map(product => (
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

export default ProductTodayNew;
// const getProductDetail = async () => {
  //   const response = await axios.post("http://localhost:8080/api/ProductDetail&Code=", {
  //     action: "getProductDetail",
  //     value: id
  //   })
    
  //   navigate('/ProductDetail');
  //   setDataProductDetail(response.data);
  //   sessionStorage.setItem("dataProductDetail", JSON.stringify(response.data))
  // };