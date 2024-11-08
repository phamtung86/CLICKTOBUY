import React, { useContext, useEffect, useMemo, useState } from 'react';
import '../../Style/Customer/product.css';
import ProductContext from '../Context/ProductContext';
import CountdownTime from './CountdownTime'; // Import CountdownTimer
import Product from './Product';

const ProductTodayNew = ({ cart, setCart }) => {
  const [startIndex, setStartIndex] = useState(0);
  const {dataProducts}= useContext(ProductContext)
  const targetDate = new Date(2024, 11, 20, 12, 0, 0, 0);
  targetDate.setHours(targetDate.getHours() + 1);

  // Lấy 10 sản phẩm tiếp theo từ danh sách
  const paginatedProducts = useMemo(() => {
    const productsToday = dataProducts.filter(
      (item) =>  item.currentQuantity > 0
    );;
    const slicedProducts = productsToday.slice(startIndex, startIndex + 10);
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
        <div className="product--title">Duy nhất hôm nay</div>
        <div className="product--time">
          <span className="product--time--text">Kết thúc trong</span>
          <CountdownTime targetDate={targetDate} />
        </div>
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

export default ProductTodayNew;
