import React, { useState } from "react";
import CartHover from "./CartHover";
import LocatedNew from "./LocatedNew";
import { Link } from 'react-router-dom';
import { LoadDataHover } from "./CartHover";

const Head = () => {
  const [current, setCurrent] = useState(1);
  const [hover, setHover] = useState(1);

  function changeCurrent() {
    setCurrent((c) => c + 1);
  }

  function changeHover() {
    setHover((c) => c + 1);
  }

  return (
    <div className="header">
      <div className="header__title">CLICKTOBUY</div>
      <div className="header__search">
        <form className="search--form">
          <span className="search__icon"><i className="fa-solid fa-magnifying-glass"></i></span>
          <input className="search--text" type="text" name="search--product" placeholder="Giao nhanh trong 2h" />
        </form>
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
        <div className="cart--icon" onMouseEnter={LoadDataHover}><i className="fa-solid fa-cart-shopping"></i></div>
        <div className="cart--title">Giỏ hàng</div>
        {hover % 2 === 0 && <CartHover />}
      </div>
      <div className="header__account">
        <div className="account--icon"><i className="fa-solid fa-circle-user"></i></div>
        <div className="account--title">Tài khoản</div>
      </div>
    </div>
  );
};

export default Head;
