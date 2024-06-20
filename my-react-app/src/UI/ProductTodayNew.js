import '../index.css'
import { useState,useEffect } from 'react';
import { getInformationProduct } from './CartNew';
const Product = ({ id, image, name, unit, price, priceSale, note, sale, saleHidden, cart, setCart }) => {
    const handleClick = () => {
      getInformationProduct({ id, image, name, unit, price, priceSale, note, sale, saleHidden }, cart, setCart);
    };
    return (
        <div className="products" key={id}>
            <div className="product--image">
                <img className="image--product" src={image} alt="San pham hom nay" />
                <div className={sale ? "product__discount" : "product__discount__none"}>{sale}</div>
            </div>
            <div className="product--item">
                <div className="product--name">{name}</div>
                <div className="product--unit">DVT: {unit}</div>
                <div className="product--note">
                    <img className="image--note" src={image} alt="Hinh anh san pham" />
                    <div className="product--note--text">{note}</div>
                </div>
                <div className='product--price'>
                <div className='product__today--price--real'>{(sale) ? price.toLocaleString('en-US',{maximumFractionDigits : 3})+ " ₫": price.toLocaleString('en-US',{maximumFractionDigits : 3}) + " ₫" }</div>
                <div className="product__today--price--sale">{(sale) ? priceSale.toLocaleString('en-US',{maximumFractionDigits : 3}) + " ₫": "" }</div>
                </div>
            </div>
            <button className="product--click--add" onClick={handleClick}>
                <i class="fa-solid fa-cart-plus"></i> Thêm vào giỏ hàng
            </button>
        </div>
    )
}
const ProductTodayNew = ({cart,setCart}) => {

    const dataProduct = [
        {
            id: 1,
            image: "https://hcm.fstorage.vn/images/2022/wmh_tui_rac_thsh_ma%CC%80u_den_44x56-500g-.png",
            name: "Túi rác tự hủy sinh hoạt WinMart Home màu đen 44x56-500g",
            unit: "Cuộn",
            price: 39000,
            note: "Mua 1 Cuộn được tặng 1 cuộn Túi rác tự hủy sinh hoạt WinMart Home màu đen 44x56-500g",
            sale: ""
        },
        {
            id: 2,
            image: "https://hcm.fstorage.vn/images/2023/05/tuongotnho-20230526065635.png",
            name: "Tương ớt cay vừa  Nam Dương 255g",
            unit: "Chai",
            price: 12000,
            note: "Mua 2 Chai được tặng 1 chai Tương ớt cay vừa Nam Dương 255g",
            sale: ""
        },
        {
            id: 3,
            image: "https://hcm.fstorage.vn/images/2022/pizza-hai-san-manna-vi-y-120g-20221007080640-og.jpg",
            name: "Pizza hải sản Manna vị Ý 120g",
            unit: "Gói",
            price: 39400,
            note: "Mua 2 Gói được tặng 1 gói Pizza hải sản Manna vị Ý 120g",
            sale: ""
        },
        {
            id: 4,
            image: "https://hcm.fstorage.vn/images/2022/10183061-g1.jpg",
            name: "Xúc xích Ponnie dinh dưỡng thịt heo 4*70g",
            unit: "Gói",
            price: 39400,
            note: "",
            sale: ""
        },
        {
            id: 5,
            image: "https://hcm.fstorage.vn/images/2022/winmart-home-khan-giay-rut-250-to-2-lop_5dd2d487-1a13-4590-842f-ff9e8db19137-og.jpg",
            name: "Khăn giấy rút 250 tờ 2 lớp WinMart Home",
            unit: "Gói",
            price: 22900,
            note: "Mua 2 Gói được tặng 1 gói Khăn giấy rút 250 tờ 2 lớp WinMart Home",
            sale: ""
        },
        {
            id: 6,
            image: "https://hcm.fstorage.vn/images/2022/mat-na-ariul-7days-khang-viem-chiet-xuat-tra-23ml.jpg",
            name: "Mặt nạ  Ariul 7days kháng viêm chiết xuất trà 23ml",
            unit: "Gói",
            price: 28000,
            note: "Mua 1 Gói được tặng 1 gói Mặt nạ  Ariul 7days kháng viêm chiết xuất trà 23ml",
            sale: ""
        },
        {
            id: 7,
            image: "https://hcm.fstorage.vn/images/2023/07/rojukiss-mat-na-giup-giam-lcl-to-25ml-20230727064745.jpg",
            name: "Mặt nạ Rojukiss giúp giảm lỗ chân lông  to 25ml",
            unit: "Gói",
            price: 39000,
            note: "Mua 2 Gói được tặng 1 gói Mặt nạ Rojukiss giúp giảm lỗ chân lông to 25ml",
            sale: ""
        },
        {
            id: 8,
            image: "https://hcm.fstorage.vn/images/2023/07/lc-food-xuc-xich-pho-mai-200g-20230727063835.jpg",
            name: "Xúc xích phô mai LC Food 200g",
            unit: "Gói",
            price: 55000,
            note: "Mua 2 Gói được tặng 1 gói Xúc xích phô mai LC Food 200g",
            sale: ""
        },
        {
            id: 9,
            image: "https://hcm.fstorage.vn/images/2023/04/vietquat-2--20230418043737.png",
            name: "Trà việt quất TVT chai 470ml",
            unit: "Chai",
            price: 14300,
            note: "Mua 2 Chai được tặng 1 chai Trà việt quất TVT chai 470ml",
            sale: ""
        },
        {
            id: 10,
            image: "https://hcm.fstorage.vn/images/2022/162427595839710323687-hop-omachi-mo-khoai-toy-xot-bu-ham-93gr-og.jpg",
            name: "Thùng 24 hộp mì khoai tây Omachi sốt bò hầm 68g/70g",
            unit: "Thùng",
            price: 251800,
            note: "Mua 3 Hộp được tặng 1 hộp Mì ly ăn liền khoai tây Omachi xốt bò hầm​​​​​​​ 68g",
            sale: ""
        }
    ]
    return (
        <div className="product__today" >
            <div className="product__today--title--time">
                <div className="product__today--title">Duy nhất hôm nay</div>
                <div className="product__today--time">
                    <span className="product__today--time--text">Kết thúc trong</span>
                    <div className="product__today--time--reverse">

                        <div className="product__today--time--hours"></div>
                        <div className="product__today--time--minutes"></div>
                        <div className="product__today--time--seconds"></div>
                    </div>
                </div>
            </div>
            <div className='product__today--sell'>
            {dataProduct.map(product => 
                <Product 
                  key={product.id}
                  {...product}
                  priceSale={(product.price - (product.price * product.sale / 100))}
                  cart={cart}
                  setCart={setCart}
                />
              )}
            </div>
        </div>
    )
}
export default ProductTodayNew