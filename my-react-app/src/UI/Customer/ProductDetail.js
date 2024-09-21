import { Link } from 'react-router-dom'
import '../../Style/ProductDetail.css'
import Head from './Head'
import Services from './Services'
import Footer from './Footer'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { getInformationProduct } from './CartNew';

const ProductDetail = () => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        try {
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error("Failed to parse cart from localStorage:", error);
            return [];
        }
    });


    // lấy data thông tin sản phẩm từ session
    const [dataProductDetail, setDataProductDetail] = useState(() => {
        const savedData = sessionStorage.getItem("dataProductDetail");
        return savedData ? JSON.parse(savedData) : {};
    });

    // check sự thay đổi của session sau mỗi 0.2s
    useEffect(() => {
        const checkSessionStorage = () => {
            try {
                const savedSession = sessionStorage.getItem("dataProductDetail");
                if (savedSession) {
                    const updatedSession = JSON.parse(savedSession);
                    setDataProductDetail(updatedSession);
                }
            } catch (error) {
                console.error("Failed to parse data from sessionStorage:", error);
            }
        };
    
        checkSessionStorage();
        const intervalId = setInterval(checkSessionStorage, 200);
    
        return () => clearInterval(intervalId);
    }, []);
    
    // State quản lý số lượng sản phẩm
    const [quantity, setQuantity] = useState(1);

    // Lưu cart vào localStorage mỗi khi cart thay đổi
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const handleAddToCart = () => {
        if (!dataProductDetail.products) return;

        const { productId, productImageLink, productName, productUnit, productPrice, productDiscount, productNote } = dataProductDetail.products;
        const priceSale = productPrice - (productPrice * productDiscount / 100);

        const product = {
            id: productId,
            Image: productImageLink,
            name: productName,
            unit: productUnit,
            price: productPrice,
            priceSale: priceSale,
            note: productNote,
            sale: productDiscount,
            quantity: quantity
        };

        getInformationProduct(product, cart, setCart);
    };

    // format date
    const formattedManufactureDate = dataProductDetail.productDate
        ? format(new Date(dataProductDetail.productDate), 'dd MMMM yyyy', { locale: vi })
        : '';

    return (
        <div className='product__detail'>
            <Head />
            <Services />
            <div className='node__page'>
                <Link to={'/'} className='node__page--click'>Trang chủ </Link>
                <span className='node__page--product--name'>/ {dataProductDetail.products?.productName || ''}</span>
            </div>
            <div className='product__info'>
                <div className='product__info--image'>
                    <img className='image__product__infor' src={dataProductDetail.products?.productImageLink || ''} alt='Hình ảnh sản phẩm' />
                </div>
                <div className='product__info--detail'>
                    <div className='product__info--name'>{dataProductDetail.products?.productName || ''}</div>
                    <div className='product__info--price'>
                        <div className='product__infor--price--title'>Giá bán lẻ</div>
                        <div className='product__infor--price--value'>
                            {dataProductDetail.products?.productDiscount
                                ? (dataProductDetail.products.productPrice * (100 - dataProductDetail.products.productDiscount) / 100).toLocaleString('en-US', { maximumFractionDigits: 3 })
                                : dataProductDetail.products?.productPrice?.toLocaleString('en-US', { maximumFractionDigits: 3 })} ₫
                        </div>
                    </div>
                    <div className='product__info--status'>
                        <div className='product__info--status--title'>Tình trạng</div>
                        <div className='product__info--status--value'>Còn hàng</div>
                    </div>
                    <div className='product__info--ship'>
                        <div className='product__info--ship--title'>Vận chuyển </div>
                        <div className='product__info--ship--value'>Miễn phí giao hàng cho đơn từ 300.000đ. Giao hàng trong 2 giờ.</div>
                    </div>
                    <div className='product__info--sale'>
                        <div className='product__info--sale--title'>Khuyến mại</div>
                        <div className='product__info--sale--value'>
                            {dataProductDetail.products?.productDiscount === 0
                                ? "Không có khuyến mại"
                                : dataProductDetail.products?.productDiscount + "%"}
                        </div>
                    </div>
                    <div className='product__info--unit'>
                        <div className='product__info--unit--title'>Loại</div>
                        <div className='product__info--unit--value'>{dataProductDetail.products?.productUnit || ''}</div>
                    </div>
                    <div className='product__info--button'>
                        <div className='product__info--button--title'>Số lượng</div>
                        <button className='button--plus' onClick={() => setQuantity(quantity + 1)}> + </button>
                        <span className='quantity'>{quantity}</span>
                        <button className='button--minus' onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}> - </button>
                    </div>
                    <button className='button--add--cart' onClick={handleAddToCart}>
                        <i className="fa-solid fa-cart-plus"></i> Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
            <div className='product__description'>
                <div className='box1'>
                    <div className='box1__title'>Mô tả</div>
                    <div className='box1__content'>
                        <div className='box1__content--description'>{dataProductDetail.description || ''}</div>
                        <div className='box1__content--manufacture'>
                            <div className='box1__content--manufacture--title'>Ngày sản xuất:</div>
                            <div className='box1__content--manufacture--value'>{formattedManufactureDate}</div>
                        </div>
                        {dataProductDetail.expiry &&
                            <div className='box1__content--expiry'>
                                <div className='box1__content--expiry--title'>Hạn sử dụng:</div>
                                <div className='box1__content--expiry--value'>{dataProductDetail.expiry}</div>
                            </div>
                        }
                        {dataProductDetail.note &&
                            <div className='box1__content--note'>
                                <div className='box1__content--note--title'>Lưu ý</div>
                                <div className='box1__content--note--value'>{dataProductDetail.note}</div>
                            </div>
                        }
                    </div>
                </div>
                <div className='box2'>
                    <div className='box2__title'>Thông tin</div>
                    <div className='box2__content'>
                        <div className='box2__content--origin'>
                            <div className='box2__content--origin--title'>Xuất xứ</div>
                            <div className='box2__content--origin--value'>{dataProductDetail.origin || ''}</div>
                        </div>
                        <div className='box2__content--igredient'>
                            <div className='box2__content--igredient--title'>Thành phần</div>
                            <div className='box2__content--igredient--value'>{dataProductDetail.igredient || ''}</div>
                        </div>
                        <div className='box2__content--instruction'>
                            <div className='box2__content--instruction--title'>Hướng dẫn sử dụng</div>
                            <div className='box2__content--instruction--value'>{dataProductDetail.instruction || ''}</div>
                        </div>
                        <div className='box2__content--preserve'>
                            <div className='box2__content--preserve--title'>Bảo quản</div>
                            <div className='box2__content--preserve--value'>{dataProductDetail.preserve || ''}</div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetail;
