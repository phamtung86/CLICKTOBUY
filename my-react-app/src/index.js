import React, { useState, useEffect, useContext } from 'react';
import ReactDOM from 'react-dom/client'; // Đảm bảo bạn dùng ReactDOM.createRoot với React 18+
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CartNew from './UI/CartNew';
import Login from './UI/Login';
import { CartProvider } from './UI/CartContext';
import Register from './UI/Register';
import ForgotPass from './UI/ForgotPass';

const Main = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/cart" element={<CartNew />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Forgot-pass" element={<ForgotPass />} />
        </Routes>
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
