import React, { useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../Style/carthover.css'
import { Link } from 'react-router-dom';
import CartContext from '../Context/CartContext';

const CartHover = () => {

    const { cart, setCart } = useContext(CartContext);
    return (
        <div className="cart">
            <div className="cart--infor--show" >
                {cart.map((product, index) => {
                    return (
                        <div className="cart--infor" key={index}>
                            <div className="cart--image">
                                <img className="image--cart" alt="product" src={product.Image}></img>
                            </div>
                            <div className="cart--name">{product.name}</div>
                            <div className="cart--price">{(product.priceSale) ? product.priceSale.toLocaleString('en-US', { maximumFractionDigits: 3 }) : product.price.toLocaleString('en-US', { maximumFractionDigits: 3 })} ₫</div>
                            <div className="cart--unit">{product.unit}</div>
                            <div className="cart--total">x {product.quantity}</div>
                        </div>
                    )
                })}
            </div>
            <div className="cart--all">
                <div className="cart--all--text">Có tống cộng: {cart.length}</div>
                <Link className='cart__detail--click' to="/cart">Xem chi tiết</Link>
            </div>
        </div>
    )
}

export default CartHover


