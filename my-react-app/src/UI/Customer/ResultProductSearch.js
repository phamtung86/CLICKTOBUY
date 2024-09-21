import React, { useContext } from 'react';
import '../../Style/product.css';
import { Link } from 'react-router-dom';
import SearchContext from '../Context/SearchContext'; // Đổi tên thành SearchContext
import Head from './Head';
import Services from './Services';
import Footer from './Footer';
import CartContext from '../Context/CartContext';
import Product from './Product';
// Component hiển thị kết quả tìm kiếm
const ResultProductSearch = () => {
  const { cart, setCart } = useContext(CartContext);
  const { dataResultProductsSearch } = useContext(SearchContext);
  if (!dataResultProductsSearch) {
    return <div>Loading...</div>;
  } else {

    return (
      <>
        <Head />
        <Services />
        <div className="product">
          <div className='node__page'>
            <Link to={'/'} className='node__page--click'>Trang chủ </Link>
            <span className='node__page--product--name'>/ Tìm kiếm</span>
          </div>
          <div className="product--sell">
            {dataResultProductsSearch.map(product => (
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
        <Footer />
      </>
    );
  }
};

export default ResultProductSearch;
