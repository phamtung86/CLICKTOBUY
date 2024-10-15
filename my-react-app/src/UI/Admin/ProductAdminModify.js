import '../../Style/Admin/ProductAdminModify.css';
import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const ProductAdminmodify = ({ dataProduct, setStatusModify, valueSearch,updateProductInState , updateProductInSearch}) => {
    const [categoryID, setCategoryID] = useState(dataProduct.categoryID);
    const [productImage, setProductImage] = useState(dataProduct.productImageLink);
    const [productId, setProductId] = useState(dataProduct.productId);
    const [productName, setProductName] = useState(dataProduct.productName);
    const [productPrice, setProductPrice] = useState(dataProduct.productPrice);
    const [productNote, setProductNote] = useState(dataProduct.productNote ? dataProduct.productNote : "");
    const [productDiscount, setProductDiscount] = useState(dataProduct.productDiscount);
    const [productUnit, setProductUnit] = useState(dataProduct.productUnit);
    const [statusSuggess, setStatusSuggess] = useState(false);

    const handleSave = async () => {
        console.log(updateProductInState);
        const updatedProduct = {
            categoryID,
            productId,
            productImage,
            productName,
            productPrice,
            productNote,
            productDiscount,
            productUnit
        };
        console.log(updatedProduct);
        const url = `http://localhost:8080/api/Products/updateProduct`;
        try {
            const response = await axios.put(url, updatedProduct);
            if (response.status) {
                setStatusSuggess(true);
                setTimeout(() => {
                    setStatusSuggess(false);
                    setStatusModify(0); // Quay lại trạng thái ban đầu
                    // updateProductInState(); // Cập nhật lại danh sách sản phẩm
                    {valueSearch ? updateProductInSearch(valueSearch) : updateProductInState()}
                }, 2000);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật sản phẩm:", error);
        }
    };

    return (
        <div className="productadminmodifyhome">
            <div className="productadminmodify">
            {statusSuggess && (
                <div class="success-animation">
                    <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                </div>
            )}
                <h2 className='productadminmodify__title'>Chỉnh sửa sản phẩm</h2>
                <div className='producadminmodify__image__infor'>
                    <div className='productadminmodify__image'>
                        <img className='image__productadminmodify' src={productImage} alt={productName} />
                    </div>
                    <div className='productadminmodify__infor'>
                        <div className='productadminmodify__element'>
                            <label className='productadminmodify__label'>Tên sản phẩm:</label>
                            <input
                                className="productadminmodify__input"
                                type="text"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </div>
                        <div className='productadminmodify__element'>
                            <label className='productadminmodify__label'>Giá sản phẩm:</label>
                            <input
                                className="productadminmodify__input"
                                type="number"
                                value={productPrice}
                                onChange={(e) => setProductPrice(e.target.value)}
                            />
                        </div>
                        <div className='productadminmodify__element'>
                            <label className='productadminmodify__label'>Ghi chú:</label>
                            <input
                                className="productadminmodify__input"
                                value={productNote}
                                onChange={(e) => setProductNote(e.target.value)}
                            />
                        </div>
                        <div className='productadminmodify__element'>
                            <label className='productadminmodify__label'>Giảm giá (%):</label>
                            <input
                                className="productadminmodify__input"
                                type="number"
                                value={productDiscount}
                                onChange={(e) => setProductDiscount(e.target.value)}
                            />
                        </div>
                        <div className='productadminmodify__element'>
                            <label className='productadminmodify__label'>Loại sản phẩm:</label>
                            <input
                                className="productadminmodify__input"
                                type="text"
                                value={productUnit}
                                onChange={(e) => setProductUnit(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className='productadminmodify__button'>
                    <button className='productadminmodify__button--cancel' onClick={() => setStatusModify(0)}>Hủy</button>
                    <button className='productadminmodify__button--save' onClick={handleSave}>Lưu thay đổi</button>
                </div>
            </div>
        </div>
    );
}

export default ProductAdminmodify;
