import '../Style/producttoday.css'
import { useState,useEffect } from 'react';
import { getInformationProduct } from './CartNew';
import axios from 'axios';
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
    const [dataProductToday, setDataProductToday] = useState([]);
    useEffect(() => {
        const fetchDataProductToday = async () => {
           try {
            const responseDataProductToday = await axios.get('http://localhost:5004/api/producttoday');
            setDataProductToday(responseDataProductToday.data.data.data);
           } catch (error) {
            console.log("Error fetching data: " + error);
           }
        }
        fetchDataProductToday();
    },[]) 
   

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
            {dataProductToday.map(product => 
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