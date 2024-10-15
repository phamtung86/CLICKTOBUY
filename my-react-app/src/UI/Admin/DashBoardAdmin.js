import { useEffect, useRef, useState } from 'react';
import '../../Style/Admin/DashBoardAdmin.css'
import * as echarts from 'echarts';
import ApexCharts from 'apexcharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faDollar, faEllipsisVertical, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
const DashBoardAdmin = () => {
    const [revenue, setRevenue] = useState();
    const [dataTopSell, setDataTopSell] = useState([]);
    const [totalSellDay, setTotalSellDay] = useState();
    const [quantityUsers, setQuantityUsers] = useState();
    const [dataTopUserOrder, setDataTopUserOrder ] = useState([]);
    const [statusSelled, setStatusSelled] = useState('Hôm nay');
    const [statusRevenue, setStatusRevenue] = useState('Hôm nay');
    const [statusCustomer, setStatusCustomer] = useState('Hôm nay');
    const [statusTopSellingProduct, setStatusTopSellingProduct] = useState('Hôm nay');
    const [statusTopCustomerOrder, setStatusTopCustomerOrder] = useState('Hôm nay');


    const getCurrentMonth = () => {
        const date = new Date();
        const month = date.getMonth() + 1; // Tháng 0-11, nên +1 để thành 1-12
        return month;
    }
    const TrafficChart = () => {
        const chartRef = useRef(null);

        useEffect(() => {
            if (chartRef.current) {
                const trafficChart = echarts.init(chartRef.current);
                trafficChart.setOption({
                    tooltip: {
                        trigger: 'item',
                    },
                    legend: {
                        top: '5%',
                        left: 'center',
                    },
                    series: [
                        {
                            name: 'Access From',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false,
                                position: 'center',
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '18',
                                    fontWeight: 'bold',
                                },
                            },
                            labelLine: {
                                show: false,
                            },
                            data: [
                                { value: 1048, name: 'Search Engine' },
                                { value: 735, name: 'Direct' },
                                { value: 580, name: 'Email' },
                                { value: 484, name: 'Union Ads' },
                                { value: 300, name: 'Video Ads' },
                            ],
                        },
                    ],
                });

                // Cleanup function to dispose the chart
                return () => {
                    trafficChart.dispose();
                };
            }
        }, []);

        return <div id="trafficChart" ref={chartRef} style={{ width: '100%', height: '400px' }} />;
    };
    const BudgetChart = () => {
        const chartRef = useRef(null);

        useEffect(() => {
            if (chartRef.current) {
                const budgetChart = echarts.init(chartRef.current);
                budgetChart.setOption({
                    legend: {
                        data: ['Allocated Budget', 'Actual Spending'],
                    },
                    radar: {
                        indicator: [
                            { name: 'Sales', max: 6500 },
                            { name: 'Administration', max: 16000 },
                            { name: 'Information Technology', max: 30000 },
                            { name: 'Customer Support', max: 38000 },
                            { name: 'Development', max: 52000 },
                            { name: 'Marketing', max: 25000 },
                        ],
                    },
                    series: [
                        {
                            name: 'Budget vs spending',
                            type: 'radar',
                            data: [
                                {
                                    value: [4200, 3000, 20000, 35000, 50000, 18000],
                                    name: 'Allocated Budget',
                                },
                                {
                                    value: [5000, 14000, 28000, 26000, 42000, 21000],
                                    name: 'Actual Spending',
                                },
                            ],
                        },
                    ],
                });

                // Cleanup function
                return () => {
                    budgetChart.dispose();
                };
            }
        }, []);

        return <div id="budgetChart" ref={chartRef} style={{ width: '100%', height: '400px' }} />;
    };
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
                                                setStatusSelled('Hôm nay');
                                                getTotalSelled("DAY")}}>Hôm nay</Link></li>
                                            <li><Link className="dropdown-item" href="#" 
                                            onClick={() => {
                                                setStatusSelled('Tháng');
                                                getTotalSelled("MONTH")}}
                                                >Tháng</Link></li>
                                            <li><Link className="dropdown-item" href="#" 
                                            onClick={() => {
                                                setStatusSelled('Năm');
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
                                                {/* <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
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
                                                setStatusRevenue('Hôm nay');
                                                getRevenue("DAY");
                                                }}>Hôm nay</Link></li>
                                            <li><Link className="dropdown-item" href="#" 
                                            onClick={() => {
                                                setStatusRevenue('Tháng');
                                                getRevenue("MONTH");
                                            }}
                                                >Tháng</Link></li>
                                            <li><Link className="dropdown-item" href="#" 
                                            onClick={() => {
                                                setStatusRevenue('Năm');
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

                                            <li><Link className="dropdown-item" href="#" onClick={() => {setStatusCustomer('Hôm nay')}}>Hôm nay</Link></li>
                                            <li><Link className="dropdown-item" href="#" onClick={() => {setStatusCustomer('Tháng')}}>Tháng</Link></li>
                                            <li><Link className="dropdown-item" href="#" onClick={() => {setStatusCustomer('Năm')}}>Năm</Link></li>
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
                                                setStatusTopCustomerOrder('Hôm nay');
                                                getTopUserOrder("DAY")
                                            }}>Hôm nay</Link></li>
                                            <li><Link className="dropdown-item" href="#" 
                                            onClick={() => {
                                                setStatusTopCustomerOrder('Tháng');
                                                getTopUserOrder("MONTH");
                                            }}>Tháng</Link></li>
                                            <li><Link className="dropdown-item" href="#" 
                                            onClick={() => {
                                                setStatusTopCustomerOrder('Năm');
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
                                                    <td className='top__customer--sellest--value'><span className="account__status">Hoạt động</span></td>
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
                                                setStatusTopSellingProduct('Hôm nay');
                                                getTopSelling("DAY")
                                            }}>Hôm nay</Link></li>
                                            <li><Link className="dropdown-item" href="#" 
                                            onClick={() => {
                                                setStatusTopSellingProduct('Tháng');
                                                getTopSelling("MONTH");
                                            }}>Tháng</Link></li>
                                            <li><Link className="dropdown-item" href="#" 
                                            onClick={() => {
                                                setStatusTopSellingProduct('Năm');
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
                    <div className="col-lg-4">
                        <div className="card">
                            <div className="filter">
                                <Link className="icon" href="#" data-bs-toggle="dropdown"><FontAwesomeIcon icon={faEllipsisVertical} /></Link>
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <li className="dropdown-header text-start">
                                        <h6>Filter</h6>
                                    </li>

                                    <li><Link className="dropdown-item" href="#">Today</Link></li>
                                    <li><Link className="dropdown-item" href="#">This Month</Link></li>
                                    <li><Link className="dropdown-item" href="#">This Year</Link></li>
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

                                    <li><Link className="dropdown-item" href="#">Today</Link></li>
                                    <li><Link className="dropdown-item" href="#">This Month</Link></li>
                                    <li><Link className="dropdown-item" href="#">This Year</Link></li>
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

                                    <li><a className="dropdown-item" href="#">Today</a></li>
                                    <li><a className="dropdown-item" href="#">This Month</a></li>
                                    <li><a className="dropdown-item" href="#">This Year</a></li>
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

                                    <li><Link className="dropdown-item" href="#">Today</Link></li>
                                    <li><Link className="dropdown-item" href="#">This Month</Link></li>
                                    <li><Link className="dropdown-item" href="#">This Year</Link></li>
                                </ul>
                            </div>

                        </div>

                    </div>

                </div>
            </section>

        </main>
    )
}
export default DashBoardAdmin

                            // <div className="card-body pb-0">
                            //     <h5 className="card-title">News &amp; Updates <span>| Today</span></h5>

                            //     <div className="news">
                            //         <div className="post-item clearfix">
                            //             <img src="assets/img/news-1.jpg" alt="" />
                            //             <h4><Link href="#">Nihil blanditiis at in nihil autem</Link></h4>
                            //             <p>Sit recusandae non aspernatur laboriosam. Quia enim eligendi sed ut harum...</p>
                            //         </div>

                            //         <div className="post-item clearfix">
                            //             <img src="assets/img/news-2.jpg" alt="" />
                            //             <h4><Link href="#">Quidem autem et impedit</Link></h4>
                            //             <p>Illo nemo neque maiores vitae officiis cum eum turos elan dries werona nande...</p>
                            //         </div>

                            //         <div className="post-item clearfix">
                            //             <img src="assets/img/news-3.jpg" alt="" />
                            //             <h4><Link href="#">Id quia et et ut maxime similique occaecati ut</Link></h4>
                            //             <p>Fugiat voluptas vero eaque accusantium eos. Consequuntur sed ipsam et totam...</p>
                            //         </div>

                            //         <div className="post-item clearfix">
                            //             <img src="assets/img/news-4.jpg" alt="" />
                            //             <h4><Link href="#">Laborum corporis quo dara net para</Link></h4>
                            //             <p>Qui enim quia optio. Eligendi aut asperiores enim repellendusvel rerum cuder...</p>
                            //         </div>

                            //         <div className="post-item clearfix">
                            //             <img src="assets/img/news-5.jpg" alt="" />
                            //             <h4><Link href="#">Et dolores corrupti quae illo quod dolor</Link></h4>
                            //             <p>Odit ut eveniet modi reiciendis. Atque cupiditate libero beatae dignissimos eius...</p>
                            //         </div>

                            //     </div>

                            // </div>
            // const ReportsChart = () => {
            //     const chartRef = useRef(null);
        
            //     useEffect(() => {
            //         const chart = new ApexCharts(chartRef.current, {
            //             series: [
            //                 {
            //                     name: 'Sales',
            //                     data: [31, 40, 28, 51, 42, 82, 56],
            //                 },
            //                 {
            //                     name: 'Revenue',
            //                     data: [11, 32, 45, 32, 34, 52, 41],
            //                 },
            //                 {
            //                     name: 'Customers',
            //                     data: [15, 11, 32, 18, 9, 24, 11],
            //                 },
            //             ],
            //             chart: {
            //                 height: 350,
            //                 type: 'area',
            //                 toolbar: {
            //                     show: false,
            //                 },
            //             },
            //             markers: {
            //                 size: 4,
            //             },
            //             colors: ['#4154f1', '#2eca6a', '#ff771d'],
            //             fill: {
            //                 type: 'gradient',
            //                 gradient: {
            //                     shadeIntensity: 1,
            //                     opacityFrom: 0.3,
            //                     opacityTo: 0.4,
            //                     stops: [0, 90, 100],
            //                 },
            //             },
            //             dataLabels: {
            //                 enabled: false,
            //             },
            //             stroke: {
            //                 curve: 'smooth',
            //                 width: 2,
            //             },
            //             xaxis: {
            //                 type: 'datetime',
            //                 categories: [
            //                     '2018-09-19T00:00:00.000Z',
            //                     '2018-09-19T01:30:00.000Z',
            //                     '2018-09-19T02:30:00.000Z',
            //                     '2018-09-19T03:30:00.000Z',
            //                     '2018-09-19T04:30:00.000Z',
            //                     '2018-09-19T05:30:00.000Z',
            //                     '2018-09-19T06:30:00.000Z',
            //                 ],
            //             },
            //             tooltip: {
            //                 x: {
            //                     format: 'dd/MM/yy HH:mm',
            //                 },
            //             },
            //         });
        
            //         chart.render();
        
            //         // Cleanup function to destroy chart on unmount
            //         return () => {
            //             chart.destroy();
            //         };
            //     }, []);
        
            //     return <div id="reportsChart" ref={chartRef} style={{ width: '100%', height: '350px' }} />;
            // };