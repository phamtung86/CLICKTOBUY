import React, { useState, useEffect, useCallback } from 'react';
import '../index.css';

const getInformationProduct = (product, cart, setCart) => {
  const {id,image, name, unit, price, priceSale = price,note, sale, quantity = 1} = product;
  if (!Array.isArray(cart)) {
    cart = [];
  }

  const productIndex = cart.findIndex(item => item.id === id);
  if(productIndex !== -1){
    const newCart = [...cart];
    newCart[productIndex].quantity += quantity;
    setCart(newCart);
  } else {
    const newProduct = {id, image,name, unit, price,priceSale, note, sale, quantity};
    setCart([...cart,newProduct]);
  }
};

const CartProduct = ({ item, setCart }) => {
  
  const handleRemove = useCallback((itemId) => {
    setCart(cart => {
      const newCart = cart.filter(item => item.id !== itemId);
      return newCart;
    });
  }, [setCart]);

  const handleQuantityChange = useCallback((itemId, delta) => {
    setCart(cart => {
      const newCart = [...cart];
      const index = newCart.findIndex(item => item.id === itemId);
      if (index !== -1) {
        const newQuantity = newCart[index].quantity + delta ;
        if (newQuantity > 0) {
          newCart[index].quantity = newQuantity;
        } else if (window.confirm("Bạn có muốn xóa sản phẩm không")) {
          newCart.splice(index, 1);
        }
      }
      return newCart;
    });
  }, [setCart]);

  return (
    <div className="cart__product--component" key={item.id}>
      <div className="cart__product--image">
        <img className="image--cart__product" src={item.image} alt={item.name} />
      </div>
      <div className="cart__product--infor">
        <div className="cart__product--infor--name">{item.name}</div>
        <div className="cart__product--infor--unit--price">
          <div className='cart__product--infor--unit'>{item.unit}</div>
          <div className='cart__product--infor--price'>{(item.priceSale) ? item.priceSale.toLocaleString('en-US', { maximumFractionDigits: 3 }) : item.price.toLocaleString('en-US', { maximumFractionDigits: 3 })} ₫</div>
        </div>
        <div className="cart__product--infor--note">
          <img className="image--infor--note" src={item.image} alt={item.name} />
          <span className="infor--text">{item.note}</span>
        </div>
      </div>
      <div className="cart__quantify">
        <button className="quantify--minus" onClick={() => handleQuantityChange(item.id, -1)}>-</button>
        <span className="quantify--diplay">{item.quantity}</span>
        <button className="quantify--plus" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
      </div>
      <button className="cart__delete" onClick={() => handleRemove(item.id)}>x</button>
    </div>
  );
};


const CartNew = ({cart,setCart}) => {
  if (!Array.isArray(cart)) {
    cart = [];
  }
  // const [cart, setCart] = useCart();
  const totalBill = cart.reduce((sum, item) => (item.priceSale) ? sum + item.priceSale * item.quantity: sum + item.price * item.quantity, 0).toLocaleString('en-US', { maximumFractionDigits: 3 });
  const totalSale = cart.reduce((sum, item) => sum + (item.price - item.priceSale) * item.quantity, 0).toLocaleString('en-US', { maximumFractionDigits: 3 });
  const feeShip = (totalBill > 0) ? (5000 * Math.floor(Math.random() * 10) * 0.001).toLocaleString('en-US', { maximumFractionDigits: 3 }) : 0;
  const intoMoney = (totalBill > 0) ? totalBill : 0;
  return (
    <>
      <div className='cart__product__pay'>
        <div className="cart__product">
        {cart.length > 0 ? cart.map(item => (
          <CartProduct key={item.id} item={item} setCart={setCart} />
        )) : <div className='empty__image'>Chưa có sản phẩm</div>}
        </div>
        <div className="cart__pay">
          <div className="pay--infor">
            <span className="pay--infor--text">Tạm tính giỏ hàng</span>
            <span id='provisional' className="pay--infor--price">{totalBill} ₫</span>
          </div>
          <div className="pay--infor">
            <span className="pay--infor--text">Tạm tính sản phẩm KM</span>
            <span className="pay--infor--price">0 ₫</span>
          </div>
          <div className="pay--infor">
            <span className="pay--infor--text">Tiết kiệm được</span>
            <span className="pay--infor--price" id='total--sale'>{totalSale} ₫</span>
          </div>
          <div className="pay--infor">
            <span className="pay--infor--text">Phí vận chuyển</span>
            <span className="pay--infor--price">{feeShip} ₫</span>
          </div>
          <div className="pay--infor">
            <span className="pay--infor--text">Khuyến mại</span>
            <span className="pay--infor--price">0 ₫</span>
          </div>
          <div className="pay--infor">
            <span className="pay--infor--text">Thành tiền</span>
            <span className="pay--infor--price" id='total'>{intoMoney} ₫</span>
          </div>
          <div className="pay--infor">
            <span className="pay--infor--text">(Giá đã bao gồm VAT)</span>
            <span className="pay--infor--price"></span>
          </div>
          <div className="infor--ship">Miễn phí giao hàng</div>
          <div className="cart__pay--voucher">
            <div className="pay--voucher--icon--tect">
              <span className="cart__pay--voucher--icon"><i className="fa-solid fa-ticket"></i></span>
              <span className="cart__pay--voucher--text">Khuyến mại</span>
            </div>
            <button className="pay--voucher--click">Chọn mã voucher</button>
          </div>
          <button className="pay--click">Thanh toán</button>
        </div>
      </div>
    </>
  );
};

export {getInformationProduct,CartProduct};
export default CartNew;
