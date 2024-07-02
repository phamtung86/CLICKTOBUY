import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CartNew from './UI/CartNew';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <App/>
  // </React.StrictMode>,
  );
  
  reportWebVitals();
  // <BrowserRouter> 
  //   <Routes>
  //     <Route index element={<App />}> </Route>
  //     <Route path="/cart" element={<CartNew />} />
  //   </Routes>
  // </BrowserRouter>
