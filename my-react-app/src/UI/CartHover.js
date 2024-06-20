import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../index.css'
function getElementHover() {
    var cartStorage = JSON.parse(localStorage.getItem("cart"));
    var cart = [];
    (cartStorage != null) ? cart = cartStorage : cart = [];
    var getButtonAdd = document.getElementsByClassName("product--click--add");
    for (let i = 0; i < getButtonAdd.length; i++) {
        getButtonAdd[i].addEventListener("click", function () {
            var getImage = getButtonAdd[i].parentElement.childNodes[0].childNodes[0].src;
            var getName = getButtonAdd[i].parentElement.childNodes[1].childNodes[0].innerText;
            var getUnit = getButtonAdd[i].parentElement.childNodes[1].childNodes[1].innerText;
            var getNote = getButtonAdd[i].parentElement.childNodes[1].childNodes[2].childNodes[1].innerText;
            var getPrice = getButtonAdd[i].parentElement.childNodes[1].childNodes[3].innerText;
            var getPriceHidden = getButtonAdd[i].parentElement.childNodes[1].childNodes[4].value;
            var quantify = 1;
            //check same 
            var checkSame = 0;
            for (let j = 0; j < cart.length; j++) {
                if (cart[j]["name"] === getName) {
                    cart[j]["quantify"] += quantify;
                    checkSame = 1;
                    break;
                }
            }
            if (checkSame === 0) {
                var add = {
                    "image": getImage,
                    "name": getName,
                    "price": getPrice,
                    "unit": getUnit,
                    "note": getNote,
                    "priceHidden": getPriceHidden,
                    "quantify": quantify
                };
                cart.push(add);
                console.log("da them")
            }
            localStorage.setItem("cart", JSON.stringify(cart))
        });
    }
}
function ShowCart() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
        return cart.map((product, index) => {
            return (
                <div className="cart--infor" key={index}>
                    <div className="cart--image">
                        <img className="image--cart" alt="product" src={product.image}></img>
                    </div>
                    <div className="cart--name">{product.name}</div>
                    <div className="cart--price">{product.price}</div>
                    <div className="cart--unit">{product.unit}</div>
                    <div className="cart--total">x {product.quantify}</div>
                </div>
            )
        })
    }
}

function LoadDataHover() {
    getElementHover();
    ShowCart();
}
function CartHover() {
    return (
        <div className="cart">
            <div className="cart--infor--show" onMouseOver={LoadDataHover}>
                <ShowCart/>
            </div>
            <div className="cart--all">
                <div className="cart--all--text">Có tống cộng</div>
                <a className="cart--click" href='./Cart.js'>Xem chi tiết </a>
            </div>
        </div>
    )
}
export default CartHover
export { LoadDataHover }
