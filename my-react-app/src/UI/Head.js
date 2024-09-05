import React, { useCallback, useContext, useEffect, useState } from "react";
import CartHover from "./CartHover";
import LocatedNew from "./LocatedNew";
import '../Style/header.css';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "./CartContext";

const Head = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [getValueSearch, setGetValueSearch] = useState('');
  const [accountLogined, setAccountLogined] = useState('');
  const { cart, setCart } = useContext(CartContext);
  const [dataIdProduct, setDataIdProduct] = useState();
  const [dataProductDetail, setDataProductDetail] = useState([]);
  const navigate = useNavigate();

  // Fetch product data
  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/Products');
        setDataProduct(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataProduct();
  }, []);

  // Load username from sessionStorage
  useEffect(() => {
    const storedUsername = JSON.parse(sessionStorage.getItem('account'));
    if (storedUsername) {
      setAccountLogined(storedUsername);
    }
  }, []);

  // Fetch product detail
  const getProductDetail = useCallback(async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/ProductDetail", {
        action: "getProductDetail",
        value: dataIdProduct
      });
      setDataProductDetail(response.data);
      sessionStorage.setItem("dataProductDetail", JSON.stringify(response.data));
      navigate('/ProductDetail');
    } catch (error) {
      console.error("Request failed with status code 400:", error.response.data || error.message);
    }
  }, [dataIdProduct, navigate]);

  // Handle search input change
  const handleChange = (event) => {
    setGetValueSearch(event.target.value);
  };

  // Remove session and log out
  const removeSession = () => {
    sessionStorage.removeItem("account");
    setAccountLogined("");
    alert("Đăng xuất thành công");
  };

  // Perform product search
  const searchProduct = useCallback(() => {
    if (getValueSearch.trim().length === 0) {
      return null;
    }

    const results = dataProduct
      .filter(element => element.productName.toLowerCase().startsWith(getValueSearch.toLowerCase()))
      .map(element => (
        <div
          className="product--item--search"
          key={element.productId}
          onClick={() => {
            setDataIdProduct(element.productId);
            getProductDetail();
          }}>
          <div className="product--name--search">{element.productName}</div>
          <div className="product--note--search">
            <img className="image--note--search" src={element.productImageLink} alt="Hình ảnh sản phẩm" />
            <div className="product--note--text--search">{element.productNote}</div>
          </div>
        </div>
      ));

    return (
      <div>
        {results.length > 0 ? results : <div className="product--empty--search">Không có sản phẩm nào phù hợp.</div>}
      </div>
    );
  }, [dataProduct, getValueSearch, getProductDetail]);

  const elementSignout = () => (
    <div className="header__login__singout">
      <Link className="header__signout" onClick={removeSession}>Đăng xuất</Link>
    </div>
  );

  return (
    <div className="header">
      <div className="header__title">CLICKTOBUY</div>
      <div className="header__search">
        <form className="search--form">
          <span className="search__icon"><i className="fa-solid fa-magnifying-glass"></i></span>
          <input
            className="search--text"
            type="text"
            name="search--product"
            placeholder="Giao nhanh trong 2h"
            onChange={handleChange}
          />
        </form>
        <div className="header__search-results">
          {searchProduct()}
        </div>
      </div>
      <div className="header__cart">
        <div className="cart--icon"><i className="fa-solid fa-cart-shopping"></i></div>
        <Link className="cart--title" to="/cart">Giỏ hàng ({cart.length})</Link>
        <CartHover />
      </div>
      <div className="header__account">
        <div className="account--icon"><i className="fa-solid fa-circle-user"></i></div>
        <Link to="/Login" className="account--title">
          {accountLogined ? `${accountLogined.fullName}` : "Tài khoản"}
        </Link>
        {accountLogined && elementSignout()}
      </div>
    </div>
  );
};

export default Head;


// <div className="header__located">
//   <div className="located--default" onClick={changeCurrent}>
//     <span><i className="fa-solid fa-location-dot"></i></span>
//     <button className="located--click">Giao hàng</button>
//   </div>
//   <span className="located--display"></span>
//   {current % 2 === 0 && <LocatedNew />}
// </div>