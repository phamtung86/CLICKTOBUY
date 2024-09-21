import React, { useEffect, useState } from 'react';
import '../../Style/Admin/ProductAdmin.css';
import axios from 'axios';
import ProductAdminModify from './ProductAdminModify.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductAdminAdd from './ProductAdminAdd.js';

const ProductAdmin = () => {
    const [dataProduct, setDataProduct] = useState([]);
    const [statusProductModify, setStatusModify] = useState(0); // Khởi tạo 0 là ẩn
    const [productInforSend, setProductInforSend] = useState();
    const [getLastIDInArray, setGetLastIdInArray] = useState(0);
    const [valueSearch, setValueSearch] = useState(''); // Giá trị tìm kiếm
    const [resultProductSearchByName, setResultProductSearchByName] = useState([]);

    useEffect(() => {
        fetchDataProduct();
    }, []);

    // GET data product
    const fetchDataProduct = async () => {
        const url = 'http://localhost:8080/api/Products/getDataProducts';
        try {
            const response = await axios.get(url);
            setDataProduct(response.data);

            if (response.data.length > 0) {
                const [lastElement] = [...response.data].reverse(); // Đảo mảng sao chép
                setGetLastIdInArray(lastElement.productId);
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
        }
    };

    // DELETE sản phẩm
    const handleDelete = async (productID) => {
        try {
            const responseDelete = await axios.delete(`http://localhost:8080/api/Products/DeleteProduct?ID=${productID}`);
            console.log('Sản phẩm đã được xóa:', responseDelete.data);
            setStatusModify(0);
            fetchDataProduct();
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error);
        }
    };

    // Lưu giá trị của input tìm kiếm và thực hiện tìm kiếm ngay khi người dùng gõ phím
    const handleChangeValue = async (event) => {
        const searchValue = event.target.value;
        setValueSearch(searchValue);
        
        // Gọi API tìm kiếm 
        if (searchValue) {
            try {
                const response = await axios.post(`http://localhost:8080/api/Products/getDataProductsSearch?productName=${searchValue}`);
                setResultProductSearchByName(response.data);
            } catch (error) {
                console.log("Lỗi khi tìm kiếm sản phẩm: " + error);
            }
        } else {
            setResultProductSearchByName([]); // Reset kết quả tìm kiếm nếu chuỗi tìm kiếm quá ngắn
        }
    };

    // Xác định sản phẩm nào sẽ hiển thị (kết quả tìm kiếm hoặc toàn bộ sản phẩm)
    const productsToDisplay = resultProductSearchByName.length > 0 ? resultProductSearchByName : dataProduct;

    return (
        <div className="productadmin">
            {statusProductModify === 1 && (
                <ProductAdminModify
                    dataProduct={productInforSend}
                    setStatusModify={setStatusModify}
                    updateProductInState={fetchDataProduct}
                />
            )}
            {statusProductModify === 2 && (
                <ProductAdminAdd
                    setStatusModify={setStatusModify}
                    updateProductInState={fetchDataProduct}
                    lastID={getLastIDInArray}
                />
            )}
            <div className='fieldset__function'>
                <div className='fieldset__form'>
                    <input
                        className='fieldset__input'
                        type="text"
                        name="search"
                        placeholder='Nhập sản phẩm cần tìm'
                        onChange={handleChangeValue} // Gọi tìm kiếm khi gõ phím
                        value={valueSearch}
                    />
                </div>
                <div className='fieldset__button'>
                    <button className='action--add--button' onClick={() => setStatusModify(2)}>
                        <i className="fa-solid fa-square-plus"></i> Thêm sản phẩm mới
                    </button>
                </div>
            </div>
            <div className='productadmin--title'>
                <div className='item--title--image'>Hình ảnh</div>
                <div className='item--title'>Tên sản phẩm</div>
                <div className='item--title'>Giá</div>
                <div className='item--title'>Ghi chú</div>
                <div className='item--title'>Giảm giá</div>
                <div className='item--title'>Loại</div>
                <div className='item--title'>Hành động</div>
            </div>
            {productsToDisplay.map((item) => (
                <div className='productadmin__item' key={item.productId}>
                    <img className='productadmin__image' src={item.productImageLink} alt={item.productName} />
                    <div className='productadmin--element productadmin__name'>{item.productName}</div>
                    <div className='productadmin--element productadmin__price'>
                        {item.productPrice.toLocaleString('vi-VN', { maximumFractionDigits: 3 })}₫
                    </div>
                    <div className='productadmin--element productadmin__note'>{item.productNote}</div>
                    <div className='productadmin--element productadmin__discount'>{item.productDiscount}%</div>
                    <div className='productadmin--element productadmin__unit'>{item.productUnit}</div>
                    <div className='productadmin--element action__option'>
                        <div className='productadmin__action'>
                            <button className='action--delete--button' onClick={() => 
                                window.confirm("Bạn có muốn xóa sản phẩm " + item.productName + " không?") 
                                && handleDelete(item.productId)}>
                                <i className="fa-solid fa-trash-can"></i> Xóa
                            </button>
                            <button className='action--modify--button' onClick={() => {
                                setStatusModify(1);
                                const product = {
                                    productId: item.productId,
                                    productImageLink: item.productImageLink,
                                    productName: item.productName,
                                    productUnit: item.productUnit,
                                    productPrice: item.productPrice,
                                    productNote: item.productNote,
                                    productDiscount: item.productDiscount,
                                    categoryID: item.categories?.categoryId
                                };
                                setProductInforSend(product);
                            }}>
                                <i className="fa-solid fa-pen-to-square"></i> Sửa
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProductAdmin;
