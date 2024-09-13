import React, { useCallback, useContext, useState } from 'react';
import '../Style/cart.css';
import Head from './Head';
import CartContext from './CartContext';
import { Link, useNavigate } from 'react-router-dom';
import Voucher from './Voucher';
import axios from 'axios';

const getInformationProduct = (product, cart, setCart) => {
    const { id, Image, name, unit, price, priceSale = price, note, sale, quantity = 1 } = product;

    if (!Array.isArray(cart)) {
        cart = [];
    }

    const productIndex = cart.findIndex(item => item.id === id);
    if (productIndex !== -1) {
        const newCart = [...cart];
        newCart[productIndex].quantity += quantity;
        setCart(newCart);
    } else {
        const newProduct = { id, Image, name, unit, price, priceSale, note, sale, quantity };
        setCart([...cart, newProduct]);
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
                const newQuantity = newCart[index].quantity + delta;
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
            <div className="cart__product--I">
                <img className="image--cart__product" src={item.Image} alt={item.name} />
            </div>
            <div className="cart__product--infor">
                <div className="cart__product--infor--name">{item.name}</div>
                <div className="cart__product--infor--unit--price">
                    <div className='cart__product--infor--unit'>{item.unit}</div>
                    <div className='cart__product--infor--price'>{(item.priceSale) ? item.priceSale.toLocaleString('en-US', { maximumFractionDigits: 3 }) : item.price.toLocaleString('en-US', { maximumFractionDigits: 3 })} ₫</div>
                </div>
                <div className="cart__product--infor--note">
                    <img className="image--infor--note" src={item.Image} alt={item.name} />
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

const CartNew = () => {
    const navigate = useNavigate();
    const [statusVoucher, setStatusVoucher] = useState(0);
    const { cart, setCart } = useContext(CartContext);
    const [voucherValue, setVoucherValue] = useState({
        id: "",
        value: "",
        minOrderAmount: "",
        maxOrderAmount: "",
    });
    const [dataOrderDetail, setDataOrderDetail] = useState({
        TotalAmount: "",
        totalFee: "",
        userID: "",
        voucherID: "",
    })

    const getDataOrder = () => {
        const userIDSession = JSON.parse(sessionStorage.getItem("account"));

        const updatedDataOrderDetail = {
            TotalAmount: (intoMoney <= 0) ? 0 : intoMoney,
            totalFee: feeShip,
            userID: userIDSession.id,
            voucherID: (voucherValue.id.trim().length === 0) ? null : voucherValue.id,
        };
        setDataOrderDetail(updatedDataOrderDetail);
    };

    const getAccountFromSession = async (event) => {
        const accountName = sessionStorage.getItem("account");
        if (!accountName) {
            event.preventDefault();
            const userResponse = window.confirm("Bạn chưa đăng nhập. Bạn có muốn đăng nhập không?");
            if (userResponse) {
                navigate("/Login");
            }
        } else if (cart.length === 0) {
            event.preventDefault();
            if (window.confirm("Bạn chưa có sản phẩm để thanh toán. Vui lòng thêm sản phẩm vào giỏ hàng")) {
                navigate("/");
            }
        } else {
            try {
                getDataOrder();
                const postDataCart = await axios.post("http://localhost:8080/api/Orders", {
                    action: "insertOrders",
                    value: dataOrderDetail,
                });
                if(postDataCart) {
                    alert("Bạn đã thanh toán thành công");
                    setCart([]);
                }
            } catch (error) {
                console.log("post data cart : " + error);
            }
        }
    };

    // Khởi tạo giá trị ngẫu nhiên chỉ một lần
    const [feeShip] = useState(() => Math.floor(Math.random() * 40000 + 100));
    // Tính tổng tiền của giỏ hàng ( chưa dùng voucher )
    const totalBill = cart.reduce((sum, item) => (item.priceSale ? sum + item.priceSale * item.quantity : sum + item.price * item.quantity), 0);
    // Tính số tiền tiết kiệm được
    const totalSale = cart.reduce((sum, item) => sum + (item.price - item.priceSale) * item.quantity, 0);
    // Tính tổng số tiền khi chưa dùng voucher
    const totalMoney = totalBill + feeShip;
    // Tính số tiền sau khi dùng voucher
    const totalSaleBill = (voucherValue.value) ? (voucherValue.value <= 100) ? totalSale + totalMoney * (parseInt(voucherValue.value) / 100) : totalSale + voucherValue.value : totalMoney;
    // Tính tổng số tiền sau cùng
    const intoMoney = (voucherValue.value) ? (voucherValue.value <= 100) ? totalMoney - totalMoney * (parseInt(voucherValue.value) / 100) : totalMoney - voucherValue.value
        : totalMoney
    const handleVoucherStatusChange = (id, value, minOrderAmount, maxOrderAmount) => {
        setVoucherValue({
            id: id,
            value: value,
            minOrderAmount: minOrderAmount,
            maxOrderAmount: maxOrderAmount
        });
        setStatusVoucher(0); // Ẩn voucher sau khi chọn
    };

    const setStatusOn = (value) => {
        setStatusVoucher(value);
    };

    const setStatusDefault = () => {
        setStatusVoucher(1);
    }

    return (
        <>
            <Voucher statusVoucher={statusVoucher} onStatusChange={setStatusOn} onVoucherSelect={handleVoucherStatusChange} valueBill={totalBill} />
            <Head />
            <div className='home__back'>
                <Link className='home__back--click' to={"/"}><i className="fa-solid fa-house"></i> Trang chủ</Link>
            </div>
            <div className='cart__product__pay'>
                <div className="cart__product">
                    {cart.length > 0 ? cart.map(item => (
                        <CartProduct key={item.id} item={item} setCart={setCart} />
                    )) : <div className='empty__image'>Chưa có sản phẩm</div>}
                </div>
                <div className="cart__pay">
                    <div className="pay--infor">
                        <span className="pay--infor--text">Tạm tính giỏ hàng</span>
                        <span id='provisional' className="pay--infor--price">{totalBill.toLocaleString('en-US', { maximumFractionDigits: 3 })} ₫</span>
                    </div>

                    <div className="pay--infor">
                        <span className="pay--infor--text">Phí vận chuyển</span>
                        <span className="pay--infor--price">{(totalBill > 0) ? feeShip.toLocaleString('en-US', { maximumFractionDigits: 3 }) : 0} ₫</span>
                    </div>
                    <div className="pay--infor">
                        <span className="pay--infor--text">Khuyến mại</span>
                        <span className="pay--infor--price">{
                            (voucherValue.value) ? (voucherValue.value > 100) ? voucherValue.value.toLocaleString('en-US', { maximumFractionDigits: 3 }) + " ₫" : voucherValue.value + "%" : "Chưa áp dụng"
                        }</span>
                    </div>
                    <div className="pay--infor">
                        <span className="pay--infor--text">Tiết kiệm được</span>
                        <span className="pay--infor--price" id='total--sale'>{(voucherValue.value) ? Math.round(totalSaleBill).toLocaleString('en-US', { maximumFractionDigits: 3 }) : Math.round(totalSale).toLocaleString('en-US', { maximumFractionDigits: 3 })} ₫</span>
                    </div>
                    <div className="pay--infor">
                        <span className="pay--infor--text">Thành tiền</span>
                        <span className="pay--infor--price" id='total'> {(intoMoney < 0) ? 0 : (totalBill === 0) ? 0 : Math.round(intoMoney).toLocaleString('en-US', { maximumFractionDigits: 3 })} ₫</span>
                    </div>
                    <div className="pay--infor">
                        <span className="pay--infor--text">(Giá đã bao gồm VAT)</span>
                        <span className="pay--infor--price"></span>
                    </div>

                    <div className="cart__pay--voucher">
                        <div className="pay--voucher--icon--tect">
                            <span className="cart__pay--voucher--icon"><i className="fa-solid fa-ticket"></i></span>
                            <span className="cart__pay--voucher--text">Khuyến mại</span>
                        </div>
                        <Link className="pay--voucher--click" onClick={setStatusDefault}>Chọn mã voucher</Link>
                    </div>
                    <Link className="pay--click" onClick={getAccountFromSession}>Thanh toán {(intoMoney < 0) ? 0 : (totalBill === 0) ? 0 : Math.round(intoMoney).toLocaleString('en-US', { maximumFractionDigits: 3 })} ₫</Link>
                </div>
            </div>
        </>
    );
};

export { getInformationProduct, CartProduct };
export default CartNew;
