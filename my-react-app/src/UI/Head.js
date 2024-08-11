import React, { useContext, useEffect, useState } from "react";
import CartHover from "./CartHover";
import LocatedNew from "./LocatedNew";
import '../Style/header.css';
import axios from "axios";
import { Link } from "react-router-dom";
import CartContext from "./CartContext";

const Head = () => {
  const [current, setCurrent] = useState(1);
  const [hover, setHover] = useState(1);
  const [dataProduct, setDataProduct] = useState([]);
  const [getValueSearch, setGetValueSearch] = useState('');
  const [username, setUsername] = useState(''); // Thêm state để lưu trữ tên người dùng

  function changeCurrent() {
    setCurrent(c => c + 1);
  }

  function changeHover() {
    setHover(c => c + 1);
  }

  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const responseDataProduct = await axios.get('http://localhost:8080/api/products');
        setDataProduct(responseDataProduct.data);
      } catch (error) {
        console.log("Error fetching data: " + error);
      }
    }
    fetchDataProduct();
  }, []);

  // Tải username từ localStorage
  useEffect(() => {
    const storedUsername = sessionStorage.getItem('fullName');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleChange = (event) => {
    setGetValueSearch(event.target.value);
  }

  const removeSession = () => {
    sessionStorage.removeItem("fullName")
    setUsername("")
    alert("Đăng xuất thành công")
  }

  const searchProduct = () => {
    if (getValueSearch.trim().length === 0) {
      return null;
    }

    const results = dataProduct
      .filter(element => element.productName.toLowerCase().startsWith(getValueSearch.toLowerCase()))
      .map(element => (
        <div className="product--item--search" key={element.productID}>
          <Link to={`/product/${element.productID}`} className="product--search--click">
            <div className="product--name--search">{element.productName}</div>
            <div className="product--note--search">
              <img className="image--note--search" src={element.productImageLink} alt="Hình ảnh sản phẩm" />
              <div className="product--note--text--search">{element.productNote}</div>
            </div>
          </Link>
        </div>
      ));

    return (
      <div>
        {results.length > 0 ? results : <div className="product--empty--search">Không có sản phẩm nào phù hợp.</div>}
      </div>
    );
  }

  const elementSignout = () => {
    return (
      <div className="header__login__singout">
          <Link className="header__signout"  onClick={removeSession} >Đăng xuất</Link>
        </div>
    )
  }

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
      <div className="header__located">
        <div className="located--default" onClick={changeCurrent}>
          <span><i className="fa-solid fa-location-dot"></i></span>
          <button className="located--click">Giao hàng</button>
        </div>
        <span className="located--display"></span>
        {current % 2 === 0 && <LocatedNew />}
      </div>
      <div className="header__cart" onMouseEnter={changeHover}>
        <div className="cart--icon"><i className="fa-solid fa-cart-shopping"></i></div>
        <Link className="cart--title" to="/cart">Giỏ hàng</Link>
        <CartHover />
      </div>
      <div className="header__account">
        <div className="account--icon"><i className="fa-solid fa-circle-user"></i></div>
        <Link to="/Login" className="account--title">
          {username ? `${username}` : "Tài khoản"}
        </Link>
        {username && elementSignout()}
      </div>
    </div>
  );
};

export default Head;
