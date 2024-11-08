import { faCartShopping, faDollar, faEllipsisVertical, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../Style/Admin/DashBoard/DashBoardAdmin.css';
import '../Account/Account';
const DashBoardAdmin = () => {
    const TODAY = 'Hôm nay';
    const MONTH = 'Tháng';
    const YEAR = 'Năm';
    const [revenue, setRevenue] = useState();
    const [dataTopSell, setDataTopSell] = useState([]);
    const [totalSellDay, setTotalSellDay] = useState();
    const [quantityUsers, setQuantityUsers] = useState();
    const [dataTopUserOrder, setDataTopUserOrder ] = useState([]);
    const [statusSelled, setStatusSelled] = useState(TODAY);
    const [statusRevenue, setStatusRevenue] = useState(TODAY);
    const [statusCustomer, setStatusCustomer] = useState(TODAY);
    const [statusTopSellingProduct, setStatusTopSellingProduct] = useState(TODAY);
    const [statusTopCustomerOrder, setStatusTopCustomerOrder] = useState(TODAY);

    const getRevenue = async (revenueType) => {
        try {
            const responseRevenue = await axios.get(`http://localhost:8080/api/Orders/getTotalRevenue?type=${revenueType}`);
            setRevenue(responseRevenue.data);
        } catch (error) {
            console.log("Lỗi trong quá trình lấy doanh thu: ", error);
        }
    };
    
    useEffect(() => {
        getRevenue("DAY");
    }, []);
    

    const getTopSelling = async (type) => {
        try {
            const responeDateTopSell = await axios.get(`http://localhost:8080/api/OrdersDetail/getTopSelling?type=${type}`);
            setDataTopSell(responeDateTopSell.data);
        } catch (error) {
            console.log("Lỗi trong quá trình lấy dữ liệu top sell " + error);

        }
    }
    useEffect(() => {
        getTopSelling("DAY");
    }, [])

    const getTotalSelled = async (type) => {
        try {
            const responeDataTotalSellDay = await axios.get(`http://localhost:8080/api/OrdersDetail/getTotalSelled?type=${type}`);
            setTotalSellDay(responeDataTotalSellDay.data);
        } catch (error) {
            console.log("Lỗi trong quá trình lấy dữ liệu total sell day " + error);

        }
    }
    useEffect(() => {
        getTotalSelled("DAY");
    }, [])
    useEffect(() => {
        const getTotalUser = async () => {
            try {
                const responeDataTotalUser= await axios.get('http://localhost:8080/api/Users/getQuantityUser');
                setQuantityUsers(responeDataTotalUser.data);
            } catch (error) {
                console.log("Lỗi trong quá trình lấy dữ liệu total sell day " + error);

            }
        }
        getTotalUser();
    }, [])
    const getTopUserOrder = async (type) => {
        try {
            const responeDataTopUserOrder= await axios.get(`http://localhost:8080/api/Orders/getTopUserOrder?type=${type}`);
            setDataTopUserOrder(responeDataTopUserOrder.data);               
        } catch (error) {
            console.log("Lỗi trong quá trình lấy dữ liệu top user order " + error);

        }
    }
    useEffect(() => {
        getTopUserOrder("DAY");
    }, [])

    const changeStatusAccount = (value) => {
        switch (value) {
            case -5:
                return <span className='account__status account__status__disable'>Vô hiệu hóa</span>;
            case 1:
                return <span className='account__status account__status__active'>Hoạt động</span>;
            case -9:
                return <span className='account__status account__status__warning'>Cảnh báo</span>;
            case -1:
                return <span className='account__status account__status__lock'>Khóa</span>;
            default:
                return null;
        }
    }
    return (
        <main id="main" className="main">
            <div className="pagetitle">
                <h1>Dashboard</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li className="breadcrumb-item active">Dashboard</li>
                    </ol>
                </nav>
            </div>
            <section className="section dashboard">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col-xxl-4 col-md-6">
                                <div className="card info-card sales-card">
                                    <div className="filter">
                                        <Link className="icon" href="#" data-bs-toggle="dropdown"><FontAwesomeIcon icon={faEllipsisVertical} /></Link>
                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                            <li className="dropdown-header text-start">
                                                <h6>Filter</h6>
                                            </li>

                                            <li><Link className="dropdown-item" href="#" 
                                            onClick={() => {
                                                setStatusSelled(TODAY);
                                                getTotalSelled("DAY")}}>Hôm nay</Link></li>
                                            <li><Link className="dropdown-item" href="#" 
                                            onClick={() => {
                                                setStatusSelled(MONTH);
                                                getTotalSelled("MONTH")}}
                                                >Tháng</Link></li>
                                            <li><Link className="dropdown-item" href="#" 
                                            onClick={() => {
                                                setStatusSelled(YEAR);
                                                getTotalSelled("YEAR");
                                            }}>Năm</Link></li>
                                        </ul>
                                    </div>

                                    <div className="card-body">
                                        <h5 className="card-title">Đã bán <span>| {statusSelled}</span></h5>

                                        <div className="d-flex align-items-center">
                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                <FontAwesomeIcon icon={faCartShopping} style={{ color: "#74C0FC", }} />
                                            </div>
                                            <div className="ps-3">
                                                <h6>{totalSellDay}</h6>                                       
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-xxl-4 col-md-6">
                                <div className="card info-card revenue-card">

                                    <div className="filter">
                                        <Link className="icon" href="#" data-bs-toggle="dropdown"><FontAwesomeIcon icon={faEllipsisVertical} /></Link>
                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                            <li className="dropdown-header text-start">
                                                <h6>Filter</h6>
                                            </li>
                                            <li><Link className="dropdown-item" href="#" 
                                            onClick={() => {
                                                setStatusRevenue(TODAY);
                                                getRevenue("DAY");
                                                }}>Hôm nay</Link></li>
                                            <li><Link className="dropdown-item" href="#" 
                                            onClick={() => {
                                                setStatusRevenue(MONTH);
                                                getRevenue("MONTH");
                                            }}
                                                >Tháng</Link></li>
                                            <li><Link className="dropdown-item" href="#" 
                                            onClick={() => {
                                                setStatusRevenue(YEAR);
                                                getRevenue("YEAR");
                                            }}
                                                >Năm</Link></li>
                                        </ul>
                                    </div>

                                    <div className="card-body">
                                        <h5 className="card-title">Doanh thu <span>| {statusRevenue}</span></h5>

                                        <div className="d-flex align-items-center">
                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                <FontAwesomeIcon icon={faDollar} style={{ color: "#63E6BE" }} />
                                            </div>
                                            <div className="ps-3">
                                                <h6>{revenue ? revenue.toLocaleString('en-US', { maximumFractionDigits: 3 }) : 0}</h6>
                                                {/* <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}

                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-xxl-4 col-xl-12">
                                <div className="card info-card customers-card">
                                    <div className="filter">
                                        <Link className="icon" href="#" data-bs-toggle="dropdown"><FontAwesomeIcon icon={faEllipsisVertical} /></Link>
                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                            <li className="dropdown-header text-start">
                                                <h6>Filter</h6>
                                            </li>

                                            <li><Link className="dropdown-item" href="#" onClick={() => {setStatusCustomer(TODAY)}}>Hôm nay</Link></li>
                                            <li><Link className="dropdown-item" href="#" onClick={() => {setStatusCustomer(MONTH)}}>Tháng</Link></li>
                                            <li><Link className="dropdown-item" href="#" onClick={() => {setStatusCustomer(YEAR)}}>Năm</Link></li>
                                        </ul>
                                    </div>

                                    <div className="card-body">
                                        <h5 className="card-title">Khách hàng <span>| {statusCustomer}</span></h5>

                                        <div className="d-flex align-items-center">
                                            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                                <FontAwesomeIcon icon={faUserGroup} style={{ color: "#feba6c", }} />
                                            </div>
                                            <div className="ps-3">
                                                <h6>{quantityUsers}</h6>
                                                {/* <span className="text-danger small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">decrease</span> */}

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="card recent-sales overflow-auto">

                                    <div className="filter">
                                        <Link className="icon" href="#" data-bs-toggle="dropdown"><FontAwesomeIcon icon={faEllipsisVertical} /></Link>
                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                            <li className="dropdown-header text-start">
                                                <h6>Filter</h6>
                                            </li>

                                            <li><Link className="dropdown-item" href="#" 
                                            onClick={() => {
                                                setStatusTopCustomerOrder(TODAY);
                                                getTopUserOrder("DAY")
                                            }}>Hôm nay</Link></li>
                                            <li><Link className="dropdown-item" href="#" 
                                            onClick={() => {
                                                setStatusTopCustomerOrder(MONTH);
                                                getTopUserOrder("MONTH");
                                            }}>Tháng</Link></li>
                                            <li><Link className="dropdown-item" href="#" 
                                            onClick={() => {
                                                setStatusTopCustomerOrder(YEAR);
                                                getTopUserOrder("YEAR");
                                            }}>Năm</Link></li>
                                            
                                        </ul>
                                    </div>

                                    <div className="card-body">
                                        <h5 className="card-title">Khách hàng mua nhiều nhất <span>| {statusTopCustomerOrder}</span></h5>

                                        <table className="table table-borderless datatable">
                                                <tr>
                                                    <th className='top__customer--sellest--title' scope="col">ID</th>
                                                    <th className='top__customer--sellest--title' scope="col">Khách hàng</th>
                                                    <th className='top__customer--sellest--title' scope="col">Username</th>
                                                    <th className='top__customer--sellest--title' scope="col">Tổng giá trị mua (VND)</th>
                                                    <th className='top__customer--sellest--title' scope="col">Trạng thái</th>
                                                </tr>

                                                {dataTopUserOrder.length > 0 
                                                ? 
                                                dataTopUserOrder.map((item) => (
                                                    <tr className='rows__top__customer--sellest--value'>
                                                    <td className='top__customer--sellest--value'>{item.users.userID}</td>
                                                    <td className='top__customer--sellest--value'>{item.users.fullName}</td>
                                                    <td className='top__customer--sellest--value'>{item.users.userName}</td>
                                                    <td className='top__customer--sellest--value'>{item.TotalAmount.toLocaleString('en-US', { maximumFractionDigits: 3 })}</td>
                                                    <td className='top__customer--sellest--value'>
                                                        {changeStatusAccount(item.users.status)}
                                                    </td>
                                                </tr>   
                                                )) 
                                            : 
                                            <tr>
                                            <td className='top__product--sellest--value'>Không có dữ liệu</td>
                                            <td className='top__product--sellest--value'>Không có dữ liệu</td>
                                            <td className='top__product--sellest--value'>Không có dữ liệu</td>
                                            <td className='top__product--sellest--value'>Không có dữ liệu</td>
                                            <td className='top__product--sellest--value'>Không có dữ liệu</td>
                                       </tr>
                                            }                                  
                                        </table>

                                    </div>

                                </div>
                            </div>
                            <div className="col-12">
                                <div className="card top-selling overflow-auto">

                                    <div className="filter">
                                        <Link className="icon" href="#" data-bs-toggle="dropdown"><FontAwesomeIcon icon={faEllipsisVertical} /></Link>
                                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                            <li className="dropdown-header text-start">
                                                <h6>Filter</h6>
                                            </li>

                                            <li><Link className="dropdown-item" href="#" 
                                            onClick={() => {
                                                setStatusTopSellingProduct(TODAY);
                                                getTopSelling("DAY")
                                            }}>Hôm nay</Link></li>
                                            <li><Link className="dropdown-item" href="#" 
                                            onClick={() => {
                                                setStatusTopSellingProduct(MONTH);
                                                getTopSelling("MONTH");
                                            }}>Tháng</Link></li>
                                            <li><Link className="dropdown-item" href="#" 
                                            onClick={() => {
                                                setStatusTopSellingProduct(YEAR);
                                                getTopSelling("YEAR");
                                            }}>Năm</Link></li>
                                        </ul>
                                    </div>

                                    <div className="card-body pb-0">
                                        <h5 className="card-title">Bán chạy nhất <span>| {statusTopSellingProduct}</span></h5>

                                        <table className="table table-borderless">
                                            <thead>
                                                <tr>
                                                    <th className='top__product--sellest--title' scope="col">Hình ảnh</th>
                                                    <th className='top__product--sellest--title' scope="col">Sản phẩm</th>
                                                    <th className='top__product--sellest--title' scope="col">Giá bán (VND)</th>
                                                    <th className='top__product--sellest--title' scope="col">Đã bán</th>
                                                    <th className='top__product--sellest--title' scope="col">Doanh thu (VND)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataTopSell.length > 0 ? 
                                                dataTopSell.map((item) => (
                                                    <tr className='top__product--sellest--rows'>
                                                        <td className='top__product--sellest--value' ><Link href="#"><img className='image__top__sell' src={item.product.productImageLink} alt={item.product.productName} /></Link></td>
                                                        <td className='top__product--sellest--value'><Link href="#" className="sell__top-product--name">{item.product.productName}</Link></td>
                                                        <td className='top__product--sellest--value'>{item.product.productDiscount > 0 
                                                        ? (item.product.productPrice*((100 - item.product.productDiscount)/100)).toLocaleString('en-US', { maximumFractionDigits: 3 })
                                                        : item.product.productPrice.toLocaleString('en-US', { maximumFractionDigits: 3 }) }</td>
                                                        <td className='top__product--sellest--value'>{item.quantity}</td>
                                                        <td className='top__product--sellest--value'>{item.product.productDiscount > 0 
                                                        ? (((item.product.productPrice*((100 - item.product.productDiscount)/100)))*item.quantity).toLocaleString('en-US', { maximumFractionDigits: 3 })
                                                        : (item.product.productPrice*item.quantity).toLocaleString('en-US', { maximumFractionDigits: 3 }) }</td>
                                                    </tr>
                                                ))
                                                : 
                                                <tr>
                                                     <td className='top__product--sellest--value'>Không có dữ liệu</td>
                                                     <td className='top__product--sellest--value'>Không có dữ liệu</td>
                                                     <td className='top__product--sellest--value'>Không có dữ liệu</td>
                                                     <td className='top__product--sellest--value'>Không có dữ liệu</td>
                                                     <td className='top__product--sellest--value'>Không có dữ liệu</td>
                                                </tr>
                                            }

                                            </tbody>
                                        </table>

                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                    {/* <div className="col-lg-4">
                        <div className="card">
                            <div className="filter">
                                <Link className="icon" href="#" data-bs-toggle="dropdown"><FontAwesomeIcon icon={faEllipsisVertical} /></Link>
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <li className="dropdown-header text-start">
                                        <h6>Filter</h6>
                                    </li>

                                    <li><Link className="dropdown-item" href="#">{TODAY}</Link></li>
                                    <li><Link className="dropdown-item" href="#">{MONTH}</Link></li>
                                    <li><Link className="dropdown-item" href="#">{YEAR}</Link></li>
                                </ul>
                            </div>
                        </div>

                        <div className="card">
                            <div className="filter">
                                <Link className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></Link>
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <li className="dropdown-header text-start">
                                        <h6>Filter</h6>
                                    </li>

                                    <li><Link className="dropdown-item" href="#">{TODAY}</Link></li>
                                    <li><Link className="dropdown-item" href="#">{MONTH}</Link></li>
                                    <li><Link className="dropdown-item" href="#">{YEAR}</Link></li>
                                </ul>
                            </div>

                            <div className="card-body pb-0">
                                <h5 className="card-title">Budget Report <span>| This Month</span></h5>

                                <div id="budgetChart" style={{ minHeight: '400px' }} className="echart"></div>
                                <BudgetChart />
                            </div>
                        </div>

                        <div className="card">
                            <div className="filter">
                                <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <li className="dropdown-header text-start">
                                        <h6>Filter</h6>
                                    </li>

                                    <li><Link className="dropdown-item" href="#">{TODAY}</Link></li>
                                    <li><Link className="dropdown-item" href="#">{MONTH}</Link></li>
                                    <li><Link className="dropdown-item" href="#">{YEAR}</Link></li>
                                </ul>
                            </div>

                            <div className="card-body pb-0">
                                <h5 className="card-title">Website Traffic <span>| Today</span></h5>

                                <div id="trafficChart" style={{ minHeight: '400px' }} className="echart"></div>
                                <TrafficChart />
                            </div>
                        </div>

                        <div className="card">
                            <div className="filter">
                                <Link className="icon" href="#" data-bs-toggle="dropdown"><FontAwesomeIcon icon={faEllipsisVertical} /></Link>
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <li className="dropdown-header text-start">
                                        <h6>Filter</h6>
                                    </li>

                                    <li><Link className="dropdown-item" href="#">{TODAY}</Link></li>
                                    <li><Link className="dropdown-item" href="#">{MONTH}</Link></li>
                                    <li><Link className="dropdown-item" href="#">{YEAR}</Link></li>
                                </ul>
                            </div>

                        </div>

                    </div> */}

                </div>
            </section>

        </main>
    )
}
export default DashBoardAdmin
