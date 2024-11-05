import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../Style/Customer/product.css';
import { getInformationProduct } from './CartNew';

const Product = ({ id, Image, name, unit, price, priceSale, note, sale, cart, setCart }) => {
    const [isAdded, setIsAdded] = useState(false);
    const [showCircle, setShowCircle] = useState(false);
    const navigate = useNavigate();
    const [inventoryData, setInventoryData] = useState({ currentQuantity: 0 });

    const handleAddToCart = () => {
        if (inventoryData.currentQuantity > 0) {
            getInformationProduct({ id, Image, name, unit, price, priceSale, note, sale }, cart, setCart);
            setIsAdded(true);
            setShowCircle(true);
            setTimeout(() => {
                setIsAdded(false);
                setShowCircle(false);
            }, 1000);
        } else {
            alert("Sản phẩm đã hết hàng");
        }
    };

    const handleProductDetail = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/api/ProductDetail?Code=${id}`);
            sessionStorage.setItem("dataProductDetail", JSON.stringify(response.data));
            navigate('/ProductDetail');
        } catch (error) {
            console.error("Không thể lấy thông tin sản phẩm:", error);
            alert("Không thể lấy thông tin sản phẩm. Vui lòng thử lại.");
        }
    };

    return (

            <div className="products">
                <div className='product__items' key={id}>
                    {sale > 0 && <div className="ribbon ribbon-top-left"><span>{sale + "%"}</span></div>}
                    <div className="product--image" onClick={handleProductDetail}>
                        <img className="image--product" src={Image} alt="Sản phẩm hôm nay" />
                    </div>
                    <div className="product--item" onClick={handleProductDetail}>
                        <div className="product--name">{name}</div>
                        <div className="product--unit">DVT: {unit}</div>
                        <div className="product--note">
                            <img className="image--note" src={Image} alt="Hình ảnh sản phẩm" />
                            <div className="product--note--text">{note}</div>
                        </div>
                        <div className='product--price'>
                            {sale > 0 ? (
                                <>
                                    <div className='product--price--real'>
                                        {price.toLocaleString('en-US', { maximumFractionDigits: 3 }) + " ₫"}
                                    </div>
                                    <div className="product--price--sale">
                                        {priceSale.toLocaleString('en-US', { maximumFractionDigits: 3 }) + " ₫"}
                                    </div>
                                </>
                            ) : (
                                <div className="product--price--sale">
                                    {price.toLocaleString('en-US', { maximumFractionDigits: 3 }) + " ₫"}
                                </div>
                            )}
                        </div>
                    </div>
                    {showCircle && <img className="fly-to-cart-circle" src={Image} alt="Sản phẩm hôm nay" />}
                </div>
                <button className="product--click--add" onClick={handleAddToCart}>
                    <i className="fa-solid fa-cart-plus"></i> Thêm vào giỏ hàng
                </button>
            </div>
        
    );
};

export default Product;
