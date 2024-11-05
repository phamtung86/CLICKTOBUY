import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../Style/Admin/DashBoard/DashBoard.css';
import ProductAdmin from '../Product/ProductAdmin';
import HeaderAdmin from '../HeaderAdmin';
import { faBox, faCircleUp, faTicket, faUser, faWarehouse} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DashBoardAdmin from './DashBoardAdmin';
import Account from '../Account/Account';
import Order from '../Order/Order';
import Voucher from '../Voucher/Voucher';
import Inventory from '../Inventory/Inventory';

const DashBoard = () => {
    const DISPLAY_DASHBOARD = 1;
    const DISPLAY_PRODUCT = 2;
    const DISPLAY_ACCOUNT = 3;
    const DISPLAY_ORDER = 4;
    const DISPLAY_VOUCHER = 5;
    const DISPLAY_INVENTORY = 6;
    const [manageValueSelect, setManageValueSelect] = useState(DISPLAY_DASHBOARD);
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
                                <Link className={manageValueSelect === DISPLAY_DASHBOARD ? 'element--clicked' : 'element--click'} to={'#'} onClick={() => setManageValueSelect(DISPLAY_DASHBOARD)}>
                                <i className="fa-solid fa-chart-line"></i> Tổng quan
                                </Link>
                            </div>
                            <div class="nav-button">
                                <Link className={manageValueSelect === DISPLAY_PRODUCT ? 'element--clicked' : 'element--click'} to={'#'} onClick={() => setManageValueSelect(DISPLAY_PRODUCT)}>
                                <i class="fa-brands fa-product-hunt"></i> Sản phẩm
                                </Link>
                            </div>
                            <div class="nav-button">
                                <Link className={manageValueSelect === DISPLAY_ACCOUNT ? 'element--clicked' : 'element--click'} to={'#'} onClick={() => setManageValueSelect(DISPLAY_ACCOUNT)}>
                                <FontAwesomeIcon icon={faUser} /> Tài khoản
                                </Link>
                            </div>
                            <div class="nav-button">
                                <Link  className={manageValueSelect === DISPLAY_ORDER ? 'element--clicked' : 'element--click'} to={'#  '} onClick={() => setManageValueSelect(DISPLAY_ORDER)}>
                                <FontAwesomeIcon icon={faBox} />  Đơn hàng
                                </Link>
                            </div>
                            <div class="nav-button">
                                <Link className={manageValueSelect === DISPLAY_VOUCHER ? 'element--clicked' : 'element--click'} to={'#'} onClick={() => setManageValueSelect(DISPLAY_VOUCHER)}>
                                <FontAwesomeIcon icon={faTicket} /> Voucher
                                </Link>
                            </div>
                            <div class="nav-button">
                                <Link className={manageValueSelect === DISPLAY_INVENTORY ? 'element--clicked' : 'element--click'} to={'#'} onClick={() => setManageValueSelect(DISPLAY_INVENTORY)}>
                                <FontAwesomeIcon icon={faWarehouse} /> Kho
                                </Link>
                            </div>
                            <div id="nav-content-highlight"></div>
                        </div>
                        <input id="nav-footer-toggle" type="checkbox" />
                        <div id="nav-footer">
                            <div id="nav-footer-heading">
                                <div id="nav-footer-titlebox"><Link id="nav-footer-title" href="#">{data.fullName}</Link><span id="nav-footer-subtitle">Admin</span></div>
                                <label for="nav-footer-toggle"><i class="fas fa-caret-up"></i></label>
                            </div>
                            <div id="nav-footer-content">

                            </div>
                        </div>
                    </div>
                </div>
                <div className='dashboard__content'>
                    {manageValueSelect === DISPLAY_DASHBOARD && <DashBoardAdmin/>}
                    {manageValueSelect === DISPLAY_PRODUCT && <ProductAdmin />}
                    {manageValueSelect === DISPLAY_ACCOUNT && <Account />}
                    {manageValueSelect === DISPLAY_ORDER && <Order/>}
                    {manageValueSelect === DISPLAY_VOUCHER && <Voucher/>}
                    {manageValueSelect === DISPLAY_INVENTORY && <Inventory/>}
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
