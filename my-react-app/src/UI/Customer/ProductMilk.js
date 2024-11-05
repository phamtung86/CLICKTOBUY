import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Style/Customer/product.css';
import ProductContext from '../Context/ProductContext';
import Product from './Product';

// Component ProductSaleTetNew
const ProductMilk = ({ cart, setCart }) => {
  const MILK = 1;
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();
  const {dataProducts} = useContext(ProductContext)
  // Lấy 10 sản phẩm tiếp theo từ danh sách
  const paginatedProducts = useMemo(() => {
    const milkProducts = dataProducts.filter(
      (item) => item.products.categories.categoryId === MILK && item.currentQuantity > 0
    );
    const slicedProducts = milkProducts.slice(startIndex, startIndex + 10);
    return slicedProducts;
  }, [dataProducts, startIndex]);

  // Set interval 1 tiếng để di chuyển vị trí slice
  useEffect(() => {
    const intervalId = setInterval(() => {
      setStartIndex((prevIndex) => {
        if (prevIndex + 10 >= dataProducts.length) {
          return 0; // Quay lại đầu mảng khi đã chạy hết
        }
        return prevIndex + 10; // Di chuyển tiếp 10 sản phẩm
      });
    }, 1800000); // 1 tiếng = 3600000 ms

    return () => clearInterval(intervalId); // Xóa interval khi component unmount
  }, [dataProducts.length]);

  return (
    <div className="product">
      <div className="product--title--time">
        <div className='product--title'>Sữa các loại</div>
        <button className='product--discovery' onClick={() => {
          sessionStorage.setItem("ProductType", JSON.stringify("MILK"));
          navigate('/Product');
        }}>Xem thêm</button>
      </div>
      <div className='product--sell'>
        {paginatedProducts
          .map(item => (
            <Product
              key={item.products.productId}
              id={item.products.productId}
              Image={item.products.productImageLink}
              name={item.products.productName}
              price={item.products.productPrice}
              note={item.products.productNote}
              unit={item.products.productUnit}
              sale={item.products.productDiscount}
              priceSale={item.products.productPrice - (item.products.productPrice * item.products.productDiscount / 100)}
              quantity={item.currentQuantity}
              cart={cart}
              setCart={setCart}
            />
          ))}
      </div>
    </div>
  );
};

export default ProductMilk;
