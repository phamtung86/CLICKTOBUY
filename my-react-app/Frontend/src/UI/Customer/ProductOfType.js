import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CartContext from '../Context/CartContext';
import Footer from './Footer';
import Head from './Head';
import Services from './Services';
import Product from './Product';
import ProductTypeContext from '../Context/ProductTypeContext';

const ProductOfType = () => {
    const { cart, setCart } = useContext(CartContext);
    const [dataProduct, setDataProduct] = useState([]);
    const [valueType, setValueType] = useState('');
    const {type} = useContext(ProductTypeContext); // Đọc giá trị type từ context

    const ProductType = async () => {
        try {
            switch (type) {
                case "SALE":
                    setValueType("Siêu sale");
                    await fetchData('http://localhost:8080/api/Products/getDataProductsSale');
                    break;
                case "MILK":
                    setValueType("Sữa các loại");
                    await fetchData(`http://localhost:8080/api/Products/getDataProductsType?CategoryID=${1}`);
                    break;
                case "VEGETABLE":
                    setValueType("Rau - Củ - Trái cây");
                    await fetchData(`http://localhost:8080/api/Products/getDataProductsType?CategoryID=${2}`);
                    break;
                case "CLEANCHEMICAL":
                    setValueType("Hóa Phẩm - Tẩy Rửa");
                    await fetchData(`http://localhost:8080/api/Products/getDataProductsType?CategoryID=${3}`);
                    break;
                case "TAKECARE":
                    setValueType("Chăm sóc cá nhân");
                    await fetchData(`http://localhost:8080/api/Products/getDataProductsType?CategoryID=${4}`);
                    break;
                default:
                    setDataProduct([]);
                    setValueType('');
                    break;
            }
        } catch (error) {
            console.error("Error in ProductType:", error);
        }
    };

    const fetchData = async (url) => {
        try {
            const response = await axios.get(url);
            if (Array.isArray(response.data)) {
                setDataProduct(response.data); // Cập nhật dữ liệu sản phẩm
            } else {
                console.error("Data fetched is not an array:", response.data);
                setDataProduct([]); // Đặt mặc định nếu dữ liệu không phải là mảng
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setDataProduct([]); // Đặt mặc định nếu có lỗi
        }
    };

    useEffect(() => {
        if (type) {
            ProductType();
        }
    }, [type]);

    return (
        <>
            <Head />
            <Services />
            <div className="product">
                <div className='node__page'>
                    <Link to={'/'} className='node__page--click'>Trang chủ </Link>
                    <span className='node__page--product--name'>/ {valueType}</span>
                </div>
                <div className='product--sell'>
                    {Array.isArray(dataProduct) && dataProduct.length > 0 ? (
                        dataProduct.map(product => (
                            <Product
                                key={product.productId}
                                id={product.productId}
                                Image={product.productImageLink}
                                name={product.productName}
                                price={product.productPrice}
                                note={product.productNote}
                                unit={product.productUnit}
                                sale={product.productDiscount}
                                priceSale={product.productPrice - (product.productPrice * product.productDiscount / 100)}
                                cart={cart}
                                setCart={setCart}
                            />
                        ))
                    ) : (
                        <p>Không có sản phẩm nào.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductOfType;
