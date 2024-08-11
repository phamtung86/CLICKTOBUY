import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../Style/carthover.css'

const CartHover = () => {

        const [products,setProduct] = useState(() => {
            const saveProduct = JSON.parse(localStorage.getItem("cart"));
            return saveProduct || [];
        })

    
    return (
        <div className="cart">
            <div className="cart--infor--show" >
                {products.map((product, index) => {
                    return (
                        <div className="cart--infor" key={index}>
                            <div className="cart--image">
                                <img className="image--cart" alt="product" src={product.image}></img>
                            </div>
                            <div className="cart--name">{product.name}</div>
                            <div className="cart--price">{product.price}</div>
                            <div className="cart--unit">{product.unit}</div>
                            <div className="cart--total">x {product.quantity}</div>
                        </div>
                    )
                })}
            </div>
            <div className="cart--all">
                <div className="cart--all--text">Có tống cộng: {products.length}</div>
                <a className="cart--click" href='./Cart.js'>Xem chi tiết </a>
            </div>
        </div>
    )
}

export default CartHover


