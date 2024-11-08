import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../Style/Customer/header.css';
import CartContext from "../Context/CartContext";
import SearchContext from "../Context/SearchContext";
import CartHover from "./CartHover";

const Head = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [accountLogined, setAccountLogined] = useState({
    fullName: "",
    role: "",
    id: ""
  });
  const { cart } = useContext(CartContext);
  const [dataIdProduct, setDataIdProduct] = useState();
  const navigate = useNavigate();
  const { valueSearch, setValueSearch,dataResultProductsSearch, handleInputChange } = useContext(SearchContext);

  // Fetch product data
  useEffect(() => {
    const fetchDataProduct = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/Products/getDataProducts');
        setDataProduct(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataProduct();
  }, []);

  // Load username from sessionStorage
  useEffect(() => {
    const storedDataAccount = JSON.parse(sessionStorage.getItem('account'));
    if (storedDataAccount) {
      setAccountLogined({
        fullName: storedDataAccount.fullName,
        role: storedDataAccount.role,
        id: storedDataAccount.id
      });
    }
  }, []);

  const getProductDetail = useCallback(async () => {
    if (!dataIdProduct) return;
    try {
      const url = `http://localhost:8080/api/ProductDetail?Code=${dataIdProduct}`;
      const response = await axios.get(url);
      sessionStorage.setItem("dataProductDetail", JSON.stringify(response.data));
      navigate('/ProductDetail');
      sessionStorage.removeItem("valueSearch");
      setValueSearch('')
    } catch (error) {
      console.log(error);
    }
  }, [dataIdProduct, navigate]);

  // Update when dataIdProduct changes
  useEffect(() => {
    getProductDetail();
  }, [dataIdProduct, getProductDetail]);

  // Xóa session và đăng xuất
  const removeSession = (event) => {
    event.preventDefault();
    if (accountLogined.role === "ADMIN") {
      navigate('/Login');
    } else {
      navigate('/');
    }
    sessionStorage.removeItem("account");
    setAccountLogined("");
    alert("Đăng xuất thành công");
  };

  const searchProduct = useCallback(() => {
    if (!valueSearch.trim()) return null;

    const results = dataProduct
      .filter(element => element.productName.toLowerCase().startsWith(valueSearch.toLowerCase()))
      .map(element => (
        <div
          className="product--item--search"
          key={element.productId}
          onClick={() => setDataIdProduct(element.productId)}
        >
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
  }, [dataProduct, valueSearch]);

  const elementSignout = () => (
    <div className="header__login__singout">
      <Link className="header__signout" onClick={removeSession}>Đăng xuất</Link>
    </div>
  );

  const changePage = (event) => {
    event.preventDefault();
    if (valueSearch.trim()) {
      navigate("/ResultProductSearch");
      sessionStorage.removeItem("valueSearch");
    }
  };

  return (
    <div className="header">
      <div className="header__title">CLICKTOBUY</div>
      <div className="header__search">
        <form className="search--form">
          <input
            className="search--text"
            type="text"
            name="search--product"
            placeholder="Giao nhanh trong 2h"
            value={valueSearch}
            onChange={handleInputChange}
          />
          <button className="search--button" onClick={changePage}>Tìm kiếm</button>
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
          {accountLogined.fullName ? `${accountLogined.fullName}` : "Tài khoản"}
        </Link>
        {accountLogined && elementSignout()}
      </div>
    </div>
  );
};

export default Head;
