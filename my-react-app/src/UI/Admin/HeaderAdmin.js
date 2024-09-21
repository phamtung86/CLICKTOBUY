import React, { useCallback, useContext, useEffect, useState } from "react";
import '../../Style/header.css';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CartContext from "../Context/CartContext";
import SearchContext from "../Context/SearchContext";

const HeaderAdmin = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [accountLogined, setAccountLogined] = useState({
    "fullName": "",
    "role": "",
    "id": ""
  });
  const navigate = useNavigate();

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

  // Xóa session và đăng xuất
  const removeSession = (event) => {
    event.preventDefault();
    if (accountLogined.role === "ADMIN") {

      navigate('/Login')
      sessionStorage.removeItem("account");
      setAccountLogined("");
      alert("Đăng xuất thành công");
    } else {
      sessionStorage.removeItem("account");
      setAccountLogined("");
      alert("Đăng xuất thành công");

    }
  };

  const elementSignout = () => (
    <div className="header__login__singout">
      <Link className="header__signout" onClick={removeSession}>Đăng xuất</Link>
    </div>
  );
  return (
    <div className="header">
      <div className="header__title">CLICKTOBUY</div>
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

export default HeaderAdmin;