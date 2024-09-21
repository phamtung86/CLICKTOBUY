import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../Style/Admin/DashBoard.css';
import ProductAdmin from './ProductAdmin';
import { Button } from 'react-bootstrap';
import HeaderAdmin from './HeaderAdmin';
import { faCircleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DashBoard = () => {
    const navigate = useNavigate();
    const [manageValueSelect, setManageValueSelect] = useState(1);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) { // Hiện nút khi cuộn xuống hơn 300px
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <>
            <HeaderAdmin/>
            <div className='dashboard'>
                <div className='dashboard__silebar'>
                    <ul className='silebar__menu'>
                        <li className='menu--element'>
                            <Link className={manageValueSelect === 1 ? 'element--clicked' : 'element--click'} to={'#'} onClick={() => setManageValueSelect(1)}>
                                Sản phẩm
                            </Link>
                        </li>
                        <li className='menu--element'>
                            <Link className={manageValueSelect === 2 ? 'element--clicked' : 'element--click'} to={'#'} onClick={() => setManageValueSelect(2)}>
                                <i className="fa-solid fa-user"></i> Tài khoản
                            </Link>
                        </li>
                        <li className='menu--element'>
                            <Link className={manageValueSelect === 3 ? 'element--clicked' : 'element--click'} to={'#'} onClick={() => setManageValueSelect(3)}>
                                Đơn hàng
                            </Link>
                        </li>
                        <li className='menu--element'>
                            <Link className={manageValueSelect === 4 ? 'element--clicked' : 'element--click'} to={'#'} onClick={() => setManageValueSelect(4)}>
                                <i className="fa-solid fa-chart-line"></i> Báo cáo
                            </Link>
                        </li>
                    </ul>
                    <h3 className='name__shop'>CLICKTOBUY©</h3>
                </div>
                <div className='dashboard__content'>
                    {manageValueSelect === 1 && <ProductAdmin />}
                </div>
            </div>

            {/* Nút trở lại đầu trang */}
            {isVisible && (
                <button className="scroll-to-top" onClick={scrollToTop}>
                    <FontAwesomeIcon icon={faCircleUp} beat />
                </button>
            )}
        </>
    );
}

export default DashBoard;
