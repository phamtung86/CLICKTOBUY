import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../Style/product.css';
import { getInformationProduct } from './CartNew'; // Import hàm để thêm sản phẩm vào giỏ hàng

const Product = ({ id, Image, name, unit, price, priceSale, note, sale, cart, setCart }) => {
    const [isAdded, setIsAdded] = useState(false); // Trạng thái để kiểm tra đã thêm vào giỏ hàng hay chưa
    const [showCircle, setShowCircle] = useState(false); // Trạng thái để điều khiển hiệu ứng bật hình tròn
    const navigate = useNavigate();

    // Hàm để thêm sản phẩm vào giỏ hàng
    const handleClick = () => {
        getInformationProduct({ id, Image, name, unit, price, priceSale, note, sale }, cart, setCart);
        setIsAdded(true); // Cập nhật trạng thái khi đã thêm vào giỏ hàng
        setShowCircle(true); // Hiển thị hình tròn
        setTimeout(() => {
            setIsAdded(false); // Reset trạng thái sau 1 giây
            setShowCircle(false); // Ẩn hình tròn sau khi kết thúc hiệu ứng
        }, 1000);
    };

    // Hàm để lấy chi tiết sản phẩm khi người dùng click vào sản phẩm
    const getProductDetail = async (event) => {
        event.preventDefault();
        try {
            const url = `http://localhost:8080/api/ProductDetail?Code=${id}`;
            const response = await axios.get(url);
            sessionStorage.setItem("dataProductDetail", JSON.stringify(response.data));
            navigate('/ProductDetail');
        } catch (error) {
            console.error("Error fetching product details:", error);
            alert("Không thể lấy thông tin sản phẩm. Vui lòng thử lại.");
        }
    };

    return (
        <div className="products" >
            <div className='product__items'key={id}>
                    {sale > 0 && <div class="ribbon ribbon-top-left"><span>{sale + "%"}</span></div>}
                <div className="product--image" onClick={getProductDetail}>
                    <img className="image--product" src={Image} alt="Sản phẩm hôm nay" />
                    {/* Hiển thị nhãn giảm giá nếu sản phẩm có sale */}
                </div>

                {/* Thông tin sản phẩm */}
                <div className="product--item" onClick={getProductDetail}>
                    <div className="product--name">{name}</div>
                    <div className="product--unit">DVT: {unit}</div>
                    <div className="product--note">
                        <img className="image--note" src={Image} alt="Hình ảnh sản phẩm" />
                        <div className="product--note--text">{note}</div>
                    </div>

                    {/* Giá sản phẩm */}
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

                {/* Hiển thị hình tròn bay lên góc trên bên phải */}
                {showCircle && <img className="fly-to-cart-circle" src={Image} alt="Sản phẩm hôm nay" />}
            </div>
                <button className="product--click--add" onClick={handleClick}>
                    <i className="fa-solid fa-cart-plus"></i> Thêm vào giỏ hàng
                </button>

        </div>
    );
};

export default Product;
