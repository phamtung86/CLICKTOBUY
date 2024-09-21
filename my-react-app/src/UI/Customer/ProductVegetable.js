import React, { useState, useEffect, useMemo } from 'react';
import '../../Style/product.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Product from './Product';

const ProductVegetable = ({ cart, setCart }) => {
  const [dataProductsVegetable, setDataProductVegetable] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchDataProductVegetable = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/Products/getDataProductsType?CategoryID=${2}`);
        setDataProductVegetable(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataProductVegetable();
  }, []);

  // Sử dụng useMemo để random sản phẩm chỉ một lần
  const randomProducts = useMemo(() => {
    const shuffled = [...dataProductsVegetable].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10); // Lấy 10 sản phẩm ngẫu nhiên
  }, [dataProductsVegetable]);
  return (
    <div className="product">
      <div className="product--title--time">
        <div className='product--title'>Rau - Củ - Trái cây</div>
        <button className='product--discovery' onClick={() => {
          sessionStorage.setItem("ProductType", JSON.stringify("VEGETABLE"));
          navigate('/Product');
        }}>Xem thêm</button>
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

export default ProductVegetable;
