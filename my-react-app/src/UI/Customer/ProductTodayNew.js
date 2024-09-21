import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import CountdownTime from './CountdownTime'; // Import CountdownTimer
import '../../Style/product.css';
import Product from './Product';

const ProductTodayNew = ({ cart, setCart }) => {
  const [dataProductToday, setDataProductToday] = useState([]);
  const targetDate = new Date(2024, 11, 20, 12, 0, 0, 0);
  targetDate.setHours(targetDate.getHours() + 1);

  useEffect(() => {
    const fetchDataProductToday = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/Products/getDataProducts');
        setDataProductToday(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Không thể lấy dữ liệu sản phẩm. Vui lòng thử lại.");
      }
    };
    fetchDataProductToday();
  }, []);
  // Sử dụng useMemo để random sản phẩm chỉ một lần
  const randomProducts = useMemo(() => {
    const shuffled = [...dataProductToday].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10); // Lấy 10 sản phẩm ngẫu nhiên
  }, [dataProductToday]);

  return (
    <div className="product">
      <div className="product--title--time">
        <div className="product--title">Duy nhất hôm nay</div>
        <div className="product--time">
          <span className="product--time--text">Kết thúc trong</span>
          <CountdownTime targetDate={targetDate} />
        </div>
      </div>
      <div className='product--sell'>
        {randomProducts.map(product => (
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
