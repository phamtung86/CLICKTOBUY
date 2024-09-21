import '../../Style/Admin/ProductAdminModify.css';
import '../../Style/Admin/ProductAdminAdd.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductAdminAdd = ({ setStatusModify, updateProductInState, lastID }) => {
    const [imagePreview, setImagePreview] = useState(null);
    const [dataMenu, setDataMenu] = useState([]);
    const [productInfor, setProductInfor] = useState({
        productId: lastID + 1,
        productName: '',
        productPrice: '',
        productNote: '',
        productDiscount: '',
        productUnit: '',
        productCategoryId: '',
        productImage: '',
        productOrigin: '',
        productIngredient: '',
        productInstruction: '',
        productPreseve: '',
        productDescription: '',
        productExpiry: '',
        productDetailNote: '',
    });

    const handleChangeValue = (event) => {
        const { name, value } = event.target;
        setProductInfor((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log(lastID);
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const uploadResponse = await axios.post(
                `https://api.cloudinary.com/v1_1/dspqk9rl9/image/upload`,
                {
                    file: imagePreview,
                    upload_preset: 'pudthyqx',
                }
            );

            const imageUrl = uploadResponse.data.secure_url;
            const productData = { ...productInfor, productImage: imageUrl };
            const responseProduct = await axios.post('http://localhost:8080/api/Products/InsertProduct', productData);
            if (responseProduct.status === 200) {
                const repontDetail = await axios.post('http://localhost:8080/api/ProductDetail/InsertProductDetail', productData);
                if (repontDetail.status === 200) {
                    alert("Thêm thành công")
                    setStatusModify(0);
                    updateProductInState();

                }
            }
        } catch (error) {
            console.error('Lỗi khi gửi dữ liệu:', error);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Hiển thị ảnh xem trước
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        const fetchDataMenu = async () => {
            try {
                const responseDataMenu = await axios.get('http://localhost:8080/api/Categories');
                setDataMenu(responseDataMenu.data);
            } catch (error) {
                console.error('Error fetching data: ' + error);
            }
        };
        fetchDataMenu();
    }, []);

    return (
        <div className="productadminaddhome">
            <form className="productadminadd">
                <h1 className='productadminadd__title'>Thêm sản phẩm</h1>
                <div className="productadminadd__interface">
                    <div className="productadminadd__image">
                        <div className="productadminadd__image--display">
                            {imagePreview ? (
                                <img
                                    id="imageResult"
                                    src={imagePreview}
                                    alt="Uploaded preview"
                                    className="image__display"
                                />
                            ) : (
                                <p className="display__title">Ảnh của sản phẩm</p>
                            )}
                        </div>
                        <div className="productadminadd__image--input">
                            <input
                                id="upload"
                                type="file"
                                className="form-control border-0"
                                name="productImage"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    <div className='productadminadd__information'>
                        <input className='information__add'
                            type='text'
                            name='productId'
                            value={lastID + 1}
                            onChange={handleChangeValue}
                            disabled
                        />
                        <input className='information__add'
                            type='text'
                            placeholder='Nhập vào tên sản phẩm'
                            name='productName'
                            onChange={handleChangeValue}
                        />
                        <input className='information__add'
                            type='text'
                            placeholder='Nhập vào giá sản phẩm'
                            name='productPrice'
                            onChange={handleChangeValue}
                        />
                        <textarea className='information__add'
                            placeholder='Nhập vào ghi chú'
                            name='productNote'
                            onChange={handleChangeValue}
                            rows={1}
                        />
                        <input className='information__add'
                            type='text'
                            placeholder='Nhập vào mã giảm giá (Nếu không có thì nhập 0)'
                            name='productDiscount'
                            onChange={handleChangeValue}
                        />
                        <input className='information__add'
                            type='text'
                            placeholder='Nhập vào đơn vị tính của sản phẩm'
                            name='productUnit'
                            onChange={handleChangeValue}
                        />
                        <select className="information__add--list"
                            name='productCategoryId'
                            onChange={handleChangeValue}>
                            {dataMenu.map((item) => (
                                <option
                                    key={item.categoryId}
                                    value={item.categoryId}>
                                    {item.categoryName}
                                </option>
                            ))}
                        </select>
                        <input className='information__add'
                            type='text'
                            placeholder='Nhập vào nguồn gốc'
                            name='productOrigin'
                            onChange={handleChangeValue}
                        />
                        <textarea className='information__add'
                            placeholder='Nhập vào thành phần'
                            name='productIngredient'
                            onChange={handleChangeValue}
                            rows={1}
                        />
                        <textarea className='information__add'
                            placeholder='Nhập vào hướng dẫn sử dụng'
                            name='productInstruction'
                            onChange={handleChangeValue}
                            rows={1}
                        />
                        <textarea className='information__add'
                            placeholder='Nhập vào cách bảo quản'
                            name='productPreseve'
                            onChange={handleChangeValue}
                            rows={1}
                        />
                        <textarea className='information__add'
                            placeholder='Nhập vào thông tin giới thiệu'
                            name='productDescription'
                            onChange={handleChangeValue}
                            rows={1}
                        />
                        <input className='information__add'
                            type='date'
                            placeholder='Nhập vào ngày hết hạn'
                            name='productExpiry'
                            onChange={handleChangeValue}
                        />
                        <textarea className='information__add'
                            placeholder='Nhập vào lưu ý'
                            name='productDetailNote'
                            onChange={handleChangeValue}
                            rows={1}
                        />
                    </div>
                </div>
                <div className='productadminadd__button'>
                    <button
                        className="productadminadd__button--cancel"
                        onClick={(e) => {
                            e.preventDefault();
                            setStatusModify(0);
                        }}>
                        Hủy
                    </button>
                    <input className="productadminadd__button--reset" type="reset" value="Đặt lại" />
                    <button
                        className="productadminadd__button--submit"
                        onClick={handleSubmit}>
                        Xác nhận
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductAdminAdd;
