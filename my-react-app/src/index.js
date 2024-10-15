import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client'; // Đảm bảo bạn dùng ReactDOM.createRoot với React 18+
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { CartProvider } from './UI/Context/CartContext';
import CartNew from './UI/Customer/CartNew';
import ForgotPass from './UI/Customer/ForgotPass';
import Login from './UI/Customer/Login';
import ProductDetail from './UI/Customer/ProductDetail';
import ProductOfType from './UI/Customer/ProductOfType';
import Register from './UI/Customer/Register';
import ResultProductSearch from './UI/Customer/ResultProductSearch';
import { SearchProvider } from './UI/Context/SearchContext';
import Voucher from './UI/Customer/Voucher';
import reportWebVitals from './reportWebVitals';
import { ProductTypeProvider } from './UI/Context/ProductTypeContext';
import { AuthProvider } from './UI/Context/AuthContext';
import ProtectedRoute from './UI/Customer/ProtectedRoute';
import DashBoard from './UI/Admin/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import ScrollToTop from './UI/Feature/Scroll'; // Đảm bảo đúng đường dẫn
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp, faHeadset } from '@fortawesome/free-solid-svg-icons';

const Main = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
      const handleScroll = () => {
          if (window.scrollY > 300) { // Hiện nút khi cuộn xuống hơn 300px
              setIsVisible(true);
          } else {
              setIsVisible(false);
          }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <BrowserRouter basename="/CLICKTOBUY">
      <AuthProvider>
        <CartProvider>
          <SearchProvider>
            <ProductTypeProvider>
              {/* Component ScrollToTop sẽ tự động cuộn lên đầu trang khi route thay đổi */}
              <ScrollToTop />
              {/* Các Route không cần bảo vệ */}
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Forgot-pass" element={<ForgotPass />} />
                <Route path="/ResultProductSearch" element={<ResultProductSearch />} />
              </Routes>

              {/* Các Route chỉ cho khách hàng (CUSTOMER) */}
              <Routes>
                <Route path="/Voucher" element={<ProtectedRoute role={'CUSTOMER'}><Voucher /></ProtectedRoute>} />
                <Route path="/cart" element={<ProtectedRoute role={'CUSTOMER'}><CartNew /></ProtectedRoute>} />
                <Route path="/ProductDetail" element={<ProductDetail />} />
                <Route path="/Product" element={<ProductOfType />} />
              </Routes>

              {/* Các Route chỉ cho quản trị viên (ADMIN) */}
              <Routes>
                <Route path="/Admin" element={<ProtectedRoute role={'ADMIN'}><DashBoard /></ProtectedRoute>} />
              </Routes>
            </ProductTypeProvider>
          </SearchProvider>
        </CartProvider>
      </AuthProvider>
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
