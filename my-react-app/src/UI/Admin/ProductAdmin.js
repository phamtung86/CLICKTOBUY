import React, { useEffect, useState } from 'react';
import '../../Style/Admin/ProductAdmin.css';
import axios from 'axios';
import ProductAdminModify from './ProductAdminModify.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductAdminAdd from './ProductAdminAdd.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faSquarePlus, faTrashCan, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash'; // Sử dụng lodash để debounce

const ProductAdmin = () => {
    const [dataProduct, setDataProduct] = useState([]);
    const [statusProductModify, setStatusModify] = useState(0); // Khởi tạo 0 là ẩn
    const [productInforSend, setProductInforSend] = useState();
    const [getLastIDInArray, setGetLastIdInArray] = useState(0);
    const [valueSearch, setValueSearch] = useState(''); // Giá trị tìm kiếm
    const [resultProductSearchByName, setResultProductSearchByName] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Thêm state loading

    useEffect(() => {
        fetchDataProduct();
    }, []);

    // GET data product
    const fetchDataProduct = async () => {
        setIsLoading(true); // Bắt đầu loading
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
        } finally {
            setIsLoading(false); // Kết thúc loading
        }
    };

    // DELETE sản phẩm
    const handleDelete = async (productID) => {
        try {
            const responseDelete = await axios.delete(`http://localhost:8080/api/Products/DeleteProduct?ID=${productID}`);
            setStatusModify(0);
            if(responseDelete.status === 200) {
                setValueSearch('')
                {valueSearch ? debouncedSearch() : fetchDataProduct()}
            }
            
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error);
        }
    };

    // Sử dụng debounce để giới hạn việc gọi API khi gõ phím
    const debouncedSearch = _.debounce(async (searchValue) => {
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
    }, 300); // Độ trễ 300ms

    // Lưu giá trị của input tìm kiếm và gọi debounce search
    const handleChangeValue = (event) => {
        const searchValue = event.target.value;
        setValueSearch(searchValue);
        debouncedSearch(searchValue); // Gọi debounce search
    };

    // Xác định sản phẩm nào sẽ hiển thị (kết quả tìm kiếm hoặc toàn bộ sản phẩm)
    const productsToDisplay = resultProductSearchByName.length > 0 ? resultProductSearchByName : dataProduct;

    return (
        <div className="productadmin">
            {statusProductModify === 1 && (
                <ProductAdminModify
                    dataProduct={productInforSend}
                    setStatusModify={setStatusModify}
                    valueSearch={valueSearch}
                    updateProductInState={fetchDataProduct}
                    updateProductInSearch={debouncedSearch}
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
                        onChange={handleChangeValue} // Gọi debounce search
                        value={valueSearch}
                    />
                </div>
                <div className='fieldset__button'>
                    <button className='action--add--button' onClick={() => setStatusModify(2)}>
                        <FontAwesomeIcon icon={faSquarePlus} /> Thêm sản phẩm mới
                    </button>
                </div>
            </div>

            {isLoading ? ( // Hiển thị spinner khi đang tải dữ liệu
                <div className="loading-spinner">
                    <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: '64px', color: '#0d6efd' }} />
                </div>
            ) : (
                <>
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
                                        <FontAwesomeIcon icon={faTrashCan} /> Xóa
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
                                        <FontAwesomeIcon icon={faPenToSquare} /> Sửa
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

export default ProductAdmin;
