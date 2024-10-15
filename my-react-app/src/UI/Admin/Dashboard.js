import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../Style/Admin/DashBoard.css';
import ProductAdmin from './ProductAdmin';
import { Button } from 'react-bootstrap';
import HeaderAdmin from './HeaderAdmin';
import { faCircleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DashBoardAdmin from './DashBoardAdmin';
import Account from './Account/Account';

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
    const data = JSON.parse(sessionStorage.getItem("account"));
    return (
        <>
            <HeaderAdmin />
            <div className='dashboard'>
                <div className='dashboard__silebar'>
                    <div id="nav-bar">
                        <input id="nav-toggle" type="checkbox" />
                        <div id="nav-header"><Link id="nav-title" to={'/'} >CLICKTOBUY</Link>
                            <hr />
                        </div>
                        <div id="nav-content">
                            <div class="nav-button">
                                <Link className={manageValueSelect === 1 ? 'element--clicked' : 'element--click'} to={'#'} onClick={() => setManageValueSelect(1)}>
                                <i className="fa-solid fa-chart-line"></i> Tổng quan
                                </Link>
                            </div>
                            <div class="nav-button">
                                <Link className={manageValueSelect === 2 ? 'element--clicked' : 'element--click'} to={'#'} onClick={() => setManageValueSelect(2)}>
                                    Sản phẩm
                                </Link>
                            </div>
                            <div class="nav-button">
                                <Link className={manageValueSelect === 3 ? 'element--clicked' : 'element--click'} to={'#'} onClick={() => setManageValueSelect(3)}>
                                    <i className="fa-solid fa-user"></i> Tài khoản
                                </Link>
                            </div>
                            <div class="nav-button">
                                <Link className={manageValueSelect === 4 ? 'element--clicked' : 'element--click'} to={'#'} onClick={() => setManageValueSelect(4)}>
                                    Đơn hàng
                                </Link>
                            </div>
                            <div class="nav-button">
                                <Link className={manageValueSelect === 5 ? 'element--clicked' : 'element--click'} to={'#'} onClick={() => setManageValueSelect(5)}>
                                    <i className="fa-solid fa-chart-line"></i> Báo cáo
                                </Link>
                            </div>
                            <div id="nav-content-highlight"></div>
                        </div>
                        <input id="nav-footer-toggle" type="checkbox" />
                        <div id="nav-footer">
                            <div id="nav-footer-heading">
                                <div id="nav-footer-titlebox"><a id="nav-footer-title" href="#">{data.fullName}</a><span id="nav-footer-subtitle">Admin</span></div>
                                <label for="nav-footer-toggle"><i class="fas fa-caret-up"></i></label>
                            </div>
                            <div id="nav-footer-content">

                            </div>
                        </div>
                    </div>
                    {/* <h3 className='name__shop'>CLICKTOBUY©</h3> */}
                </div>
                <div className='dashboard__content'>
                    {manageValueSelect === 1 && <DashBoardAdmin/>}
                    {manageValueSelect === 2 && <ProductAdmin />}
                    {manageValueSelect === 3 && <Account />}
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
