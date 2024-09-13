import React from 'react';
import ReactDOM from 'react-dom/client'; // Đảm bảo bạn dùng ReactDOM.createRoot với React 18+
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { CartProvider } from './UI/CartContext';
import CartNew from './UI/CartNew';
import ForgotPass from './UI/ForgotPass';
import Login from './UI/Login';
import ProductDetail from './UI/ProductDetail';
import ProductOfType from './UI/ProductOfType';
import Register from './UI/Register';
import ResultProductSearch from './UI/ResultProductSearch';
import { SearchProvider } from './UI/SearchContext';
import Voucher from './UI/Voucher';
import reportWebVitals from './reportWebVitals';
import { ProductTypeProvider } from './UI/ProductTypeContext';

const Main = () => {
  return (
    <BrowserRouter basename="/CLICKTOBUY">
      <CartProvider>
        <SearchProvider>
          <ProductTypeProvider>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/cart" element={<CartNew />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Forgot-pass" element={<ForgotPass />} />
              <Route path="/Voucher" element={<Voucher />} />
              <Route path="/ProductDetail" element={<ProductDetail />} />
              <Route path="/ResultProductSearch" element={<ResultProductSearch />} />
              <Route path="/Product" element={<ProductOfType />} />
            </Routes>
          </ProductTypeProvider>
        </SearchProvider>
      </CartProvider>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Main />
  // </React.StrictMode>
);

reportWebVitals();
