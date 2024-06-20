import React, { useState, useEffect } from 'react';
import '../index.css';
import { getInformationProduct } from './CartNew';
const Product = ({ id, image, name, unit, price, priceSale, note, sale, cart, setCart }) => {
  const handleClick = () => {
    getInformationProduct({ id, image, name, unit, price, priceSale, note, sale }, cart, setCart);
  };

  return (
    <div className="products__Tet products" key={id}>
      <div className="product--image">
        <img className="image--product" src={image} alt={name} />
        {sale && <div className="product__discount">{sale}%</div>}
      </div>
      <div className="product__sale--Tet--item">
        <div className="product--name">{name}</div>
        <div className="product--unit">DVT: {unit}</div>
        <div className="product--note">
          <img className="image--note" src={image} alt={name} />
          <div className="product--note--text">{note}</div>
        </div>
        <div className='product--price--Tet'>
        <div className='product--price--real'>{(sale) ? price.toLocaleString('en-US',{maximumFractionDigits : 3}) + " ₫": price.toLocaleString('en-US',{maximumFractionDigits : 3}) + " ₫" }</div>
        <div className="product--price--sale">{(sale) ? priceSale.toLocaleString('en-US',{maximumFractionDigits : 3}) + " ₫": priceSale.toLocaleString('en-US',{maximumFractionDigits : 3}) + " ₫" }</div>
        </div>
      </div>
      <button className="product--click--add" onClick={handleClick}>
        <i className="fa-solid fa-cart-plus"></i> Thêm vào giỏ hàng
      </button>
    </div>
  );
};

const ProductSaleTetNew = ({cart,setCart}) => {

  const dataProduct = [
    {
      id: 11,
      image: "https://hcm.fstorage.vn/images/2023/02/tuong-ot-chin-su-20230224043051.jpg",
      name: "Nước tương tỏi ớt Chinsu 330ml",
      sale: "20",
      price: 18800,
      unit: "Chai",
      note: ""
    },
    {
      id: 12,
      image: "https://hcm.fstorage.vn/images/2023/02/5511ce5d5435da8a842990924047b804.jpg",
      name: "TEA+ oloong vị chanh 350ml",
      sale: "34",
      price: 180900,
      unit: "Thùng",
      note: ""
    },
    {
      id: 13,
      image: "https://hcm.fstorage.vn/images/2023/05/2-20230518040220-thumb-1.jpg",
      name: "Phô mai vuông vị sữa Belcube gói 78g",
      sale: "6",
      price: 47300,
      unit: "Hộp",
      note: ""
    },
    {
      id: 14,
      image: "https://hcm.fstorage.vn/images/2022/a2efd179-63e7-4dbc-bbb5-6d6f5a44c1b9_20210908073358-og-thumb-1.jpg",
      name: "Nước giải khát Coca-Cola Zero chai nhựa lốc 6 x 1,5 lít",
      sale: "5",
      price: 117000,
      unit: "Gói 6",
      note: ""
    },
    {
      id: 15,
      image: "https://hcm.fstorage.vn/images/2022/e3a964b6-5e60-405a-9830-3af7bd99e573_20210827073738-og-thumb-1.jpg",
      name: "Sữa chua Vinamilk trái cây 100g",
      sale: "6",
      price: 7800,
      unit: "Hộp",
      note: ""
    },
    {
      id: 16,
      image: "https://hcm.fstorage.vn/images/2022/7cf24c1afe1e674372207b60fda636bd_89d0bcd4-5918-4e17-ad6e-9c3342d261e7-og-thumb-1.jpg",
      name: "Ngũ cốc ăn sáng Milo hộp 170g",
      sale: "21",
      price: 62800,
      unit: "Hộp",
      note: ""
    },
    {
      id: 17,
      image: "https://hcm.fstorage.vn/images/2023/04/kun-sua-chua-uong-huong-cam-180ml_4-goi-4-20230410013450-thumb-1.png",
      name: "Sữa chua uống hương cam Kun lốc 4 hộp x 180ml",
      sale: "20",
      price: 30900,
      unit: "Gói 4",
      note: ""
    },
    {
      id: 18,
      image: "https://hcm.fstorage.vn/images/2023/05/7-20230519021131-thumb-1.jpg",
      name: "Phô mai vị hành, ham Belcube gói 78g",
      sale: "6",
      price: 47300,
      unit: "Hộp",
      note: ""
    },
    {
      id: 19,
      image: "https://hcm.fstorage.vn/images/2023/04/ngoc-nuong-gao-st-25-dac-san-3kg-vns-1--20230426095943-thumb-1.png",
      name: "Gạo Ngọc Nương ST 25 đặc sản 3Kg",
      sale: "",
      price: 89900,
      unit: "Gói",
      note: ""
    },
    {
      id: 20,
      image: "https://hcm.fstorage.vn/images/2022/162427348903210011252-cha-loc-6-chai-nuoc-giai-khot-huong-chanh-sprite-390ml-og-thumb-1.jpg",
      name: "Nước giải khát huong chanh Sprite chai 1.5L",
      sale: "21",
      price: 20200,
      unit: "Chai",
      note: ""
    }
  ];

  return (
    <div className="product__sale--Tet">
      <div className="product__sale--Tet--title--time">
        <div className='product__sale--Tet--title'>Tết siêu sale</div>
        <button className='product__sale--Tet--discovery'>Xem thêm</button>
      </div>
      <div className='product__sale--Tet--sell product__today--sell'>
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
  );
};

export default ProductSaleTetNew;
