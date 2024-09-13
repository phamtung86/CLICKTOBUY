import { useEffect, useState } from "react";
import '../Style/services.css';

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Services = () => {
    const navigate = useNavigate();
    const [dataMenu, setDataMenu] = useState([]);
    useEffect(() => {
        const fetchDataMenu = async () => {
            try {
                const responseDataMenu = await axios.get('http://localhost:8080/api/Categories');
                setDataMenu(responseDataMenu.data);

            } catch (error) {
                console.error('Error fetching data: ' + error);
            }
        }
        fetchDataMenu();
    }, [])


    const [saveSelect, setSaveSelect] = useState();
    const hanldeGetData = (event) => {
        const value = event.target.innerText
        setSaveSelect(value);
    }
    return (

        <div className="services__nav">
            <div className="nav--all">
                <div className="nav--menu">
                    <div className="menu--title--icon">
                        <div className="menu--icon"><i class="fa-solid fa-bars"></i></div>
                        <div className="menu--title">Danh mục sản phẩm</div>
                    </div>
                    <div className="menu--list--component">
                        <div className="main--menu--component">
                            <div className="menu--main">
                                <ul className="menu--list">
                                    {dataMenu.map((item) => (
                                        <li className="menu--item item--1" key={item.categoryId} onMouseEnter={hanldeGetData}
                                            onClick={() => {
                                                sessionStorage.setItem("ProductType", JSON.stringify(item.categoryNameEng));
                                                navigate('/Product');
                                            }}
                                        >
                                            <Link className="menu--item--click" key={item.categoryId} >
                                                <div className="item--name" >{item.categoryName}</div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="nav--support">
                    <div className="support--news">
                        <div className="news--icon"><i className="fa-regular fa-envelope"></i></div>
                        <div className="news--title">Tin tức CLICKTOBUY</div>
                    </div>
                    <div className="support--advise">
                        <div className="advise--icon"><i className="fa-solid fa-headset"></i></div>
                        <div className="advise--title">Tư vấn bán hàng</div>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Services
// <div className="menu--component">
//     {dataMenu.map(itemDataContent => (
//         <div className='component--all' key={itemDataContent.categoryId}>
//             <div className='component--title'>
//                 {itemDataContent.name.map(itemName => (
//                     <Link className='component--title--click' href='#' key={itemName.id}>{itemName.name}</Link>
//                 ))}
//             </div>
//             <div className='component--image'>
//                 <img className='image--component' src={itemDataContent.CategoryImageLink} alt="Hình ảnh" />
//             </div>
//         </div>
//     ))}
// </div>