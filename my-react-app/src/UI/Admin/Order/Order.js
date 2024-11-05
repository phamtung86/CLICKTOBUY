import { useEffect, useState } from 'react';
import '../../../Style/Admin/Order/Order.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCircleCheck, faClipboardCheck, faEllipsisVertical, faEye, faHourglassHalf, faListCheck, faListOl, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import OrderDetail from './OrderDetail';

const Order = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [statusDisplayOrderDetail, setStatusDisplayOrderDetail] = useState(0);
    const [statusViewDetail, setStatusViewDetail] = useState("PENDING")
    const [infoOrderDetail, setInforOrderDetail] = useState({
        OrderID: '',
        order: ''
    });
    const [searchTerm, setSearchTerm] = useState(''); // State để lưu giá trị tìm kiếm
    const [statusFilters, setStatusFilters] = useState({
        PENDING: "DAY",
        CONFIRMED: "DAY",
        COMPLETED: "DAY",
        CANCELLED: "DAY"
    });
    const [managerSelectedOrderStatusDetail, setManageSelectedOrderStatusDetail] = useState(1)
    const [typeViewDetail, setTypeViewDetail] = useState({ type: 'UNKNOWN' })
    const handleChangeValue = (event) => {
        const { name, value } = event.target;
        setTypeViewDetail({
            ...typeViewDetail,
            [name]: value
        })
    }
    const [dataOrderViewDetail, setDataOrderViewDetail] = useState([])
    const [dataOrders, setDataOrders] = useState({
        PENDING: [],
        CONFIRMED: [],
        COMPLETED: [],
        CANCELLED: []
    });

    const fetchDataOrderViewDetail = async (status, type) => {
        setIsLoading(true); // Bắt đầu loading
        try {
            const response = await axios.get(`http://localhost:8080/api/Orders/ListOrderByStatus?status=${status}&type=${type}`);
            setDataOrderViewDetail(response.data);
        } catch (error) {
            console.error("Lỗi trong quá trình lấy trạng thái đơn hàng chi tiết:", error);
        } finally {
            setIsLoading(false); // Kết thúc loading
        }
    };
    useEffect(() => {
        fetchDataOrderViewDetail("PENDING", "DAY")
    }, [])

    const fetchDataOrderByStatus = async (status, filterType) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/Orders/ListOrderByStatus?status=${status}&type=${filterType}`);
            return response.data;
        } catch (error) {
            console.error("Lỗi trong quá trình lấy đơn hàng theo trạng thái:", error);
            return [];
        }
    };

    const fetchAllOrders = async () => {
        const statuses = ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"];
        const fetchPromises = statuses.map(status => fetchDataOrderByStatus(status, statusFilters[status]));
        const results = await Promise.all(fetchPromises);
        const updatedDataOrders = statuses.reduce((acc, status, index) => {
            acc[status] = results[index];
            return acc;
        }, {});

        setDataOrders(updatedDataOrders);
    };

    useEffect(() => {
        fetchAllOrders();
    }, [statusFilters, dataOrderViewDetail]);

    const handleFilterChange = (status, filterType) => {
        setStatusFilters(prevFilters => ({
            ...prevFilters,
            [status]: filterType
        }));
    };

    const changeDataStatusFromENToVN = (statusEN) => {
        switch (statusEN) {
            case "PENDING":
                return <span className='order__report--table--data--change button__order__status--pending'>Chờ xử lý</span>

            case "CONFIRMED":
                return <span className='order__report--table--data--change button__order__status--processing'>Đã xác nhận</span>

            case "COMPLETED":
                return <span className='order__report--table--data--change button__order__status--completed'>Hoàn thành</span>

            case "CANCELLED":
                return <span className='order__report--table--data--change button__order__status--cancel'>Đã hủy</span>
            default:
                return <span className='order__report--table--data--change button__order__status--pending'>Chờ xử lý</span>
        }
    }

    const onChangeStausDisplayOrderDetail = (value) => {
        setStatusDisplayOrderDetail(value)
    }

    return (
        <>
            {statusDisplayOrderDetail === 1
                && <OrderDetail
                    dataInforOrderDetail={infoOrderDetail}
                    onChangeStatusDisplayOrderDetail={onChangeStausDisplayOrderDetail}
                    loadDataOrderStatusType={fetchDataOrderViewDetail} />}
            <div className='order'>
                <div className='order__report--status--overview'>
                    {["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"].map(status => (
                        <div key={status} className={`card info-card ${status.toLowerCase()}-card order__status__preview`}>
                            <div className="filter">
                                <Link className="icon" href="#" data-bs-toggle="dropdown">
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </Link>
                                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <li className="dropdown-header text-start">
                                        <h6>Filter</h6>
                                    </li>
                                    {["Hôm nay", "Tháng", "Năm"].map((filter, index) => (
                                        <li key={index}>
                                            <Link
                                                className="dropdown-item"
                                                href="#"
                                                onClick={() => handleFilterChange(status, filter === "Hôm nay" ? "DAY" : filter === "Tháng" ? "MONTH" : "YEAR")}
                                            >
                                                {filter}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="card-body">
                                <h5 className="card-title">{status === "PENDING" ? "Đang chờ" : status === "CONFIRMED" ? "Đã xác nhận" : status === "COMPLETED" ? "Hoàn thành" : "Đã hủy"} <span>| {statusFilters[status] === "DAY" ? "Hôm nay" : statusFilters[status] === "MONTH" ? "Tháng" : "Năm"}</span></h5>

                                <div className="d-flex align-items-center">
                                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <FontAwesomeIcon
                                            icon={status === "PENDING" ? faHourglassHalf : status === "CONFIRMED" ? faClipboardCheck : status === "COMPLETED" ? faCircleCheck : faBan}
                                            style={{ color: status === "PENDING" ? "#74C0FC" : status === "CONFIRMED" ? "#FFD43B" : status === "COMPLETED" ? "#63E6BE" : "#ff0000" }}
                                        />
                                    </div>
                                    <div className="ps-3">
                                        <h6>{dataOrders[status].length}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='order__report--status--detail'>
                    <div className='order__report--options'>
                        <div className='order__report--option'>
                            <button
                                className={
                                    managerSelectedOrderStatusDetail === 1
                                        ? "button__order__status button__order__status--pending"
                                        : "button__none--selected button__order__status button__order__status--pending"
                                }
                                onClick={() => { setManageSelectedOrderStatusDetail(1); setStatusViewDetail("PENDING") }}
                            >Đang chờ xử lí</button>
                        </div>
                        <div className='order__report--option'>
                            <button
                                className={
                                    managerSelectedOrderStatusDetail === 2
                                        ? "button__order__status button__order__status--processing"
                                        : "button__none--selected button__order__status button__order__status--processing"
                                }
                                onClick={() => { setManageSelectedOrderStatusDetail(2); setStatusViewDetail("CONFIRMED") }}
                            >
                                Đã xác nhận
                            </button>
                        </div>
                        <div className='order__report--option'>
                            <button
                                className={
                                    managerSelectedOrderStatusDetail === 3
                                        ? "button__order__status button__order__status--completed"
                                        : "button__none--selected button__order__status button__order__status--completed"
                                }
                                onClick={() => { setManageSelectedOrderStatusDetail(3); setStatusViewDetail("COMPLETED") }}
                            >
                                Hoàn thành
                            </button>
                        </div>
                        <div className='order__report--option'>
                            <button
                                className={
                                    managerSelectedOrderStatusDetail === 4
                                        ? "button__order__status button__order__status--cancel"
                                        : "button__none--selected button__order__status button__order__status--cancel"
                                }
                                onClick={() => { setManageSelectedOrderStatusDetail(4); setStatusViewDetail("CANCELLED") }}
                            >
                                Đã hủy
                            </button>
                        </div>
                        <div className='order__report--option'>
                            <div class="select-box">
                                <div class="select-box__current" tabindex="1">
                                    <div className="select-box__value">
                                        <input
                                            className="select-box__input"
                                            type="radio"
                                            id="0"
                                            value="UNKNOWN"
                                            name="type"
                                            onChange={handleChangeValue}
                                            checked={typeViewDetail.type === "UNKNOWN"} // Kiểm tra xem đây có phải là giá trị hiện tại không
                                        />
                                        <p className="select-box__input-text">Xem theo</p>
                                    </div>
                                    <div className="select-box__value">
                                        <input
                                            className="select-box__input"
                                            type="radio"
                                            id="1"
                                            value="DAY"
                                            name="type"
                                            onChange={handleChangeValue}
                                            checked={typeViewDetail.type === "DAY"} // Kiểm tra xem đây có phải là giá trị hiện tại không
                                        />
                                        <p className="select-box__input-text">Ngày</p>
                                    </div>
                                    <div className="select-box__value">
                                        <input
                                            className="select-box__input"
                                            type="radio"
                                            id="2"
                                            value="MONTH"
                                            name="type"
                                            onChange={handleChangeValue}
                                            checked={typeViewDetail.type === "MONTH"} // Kiểm tra xem đây có phải là giá trị hiện tại không
                                        />
                                        <p className="select-box__input-text">Tháng</p>
                                    </div>
                                    <div className="select-box__value">
                                        <input
                                            className="select-box__input"
                                            type="radio"
                                            id="3"
                                            value="YEAR"
                                            name="type"
                                            onChange={handleChangeValue}
                                            checked={typeViewDetail.type === "YEAR"} // Kiểm tra xem đây có phải là giá trị hiện tại không
                                        />
                                        <p className="select-box__input-text">Năm</p>
                                    </div>

                                </div>
                                <ul class="select-box__list">
                                    <li>
                                        <label class="select-box__option" for="0" aria-hidden="aria-hidden">Xem theo</label>
                                    </li>
                                    <li>
                                        <label class="select-box__option" for="1" aria-hidden="aria-hidden">Ngày</label>
                                    </li>
                                    <li>
                                        <label class="select-box__option" for="2" aria-hidden="aria-hidden">Tháng</label>
                                    </li>
                                    <li>
                                        <label class="select-box__option" for="3" aria-hidden="aria-hidden">Năm</label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='order__report--option'>
                            <button className="button__view" onClick={() => {
                                if (typeViewDetail.type === "UNKNOWN") {
                                    alert("Bạn cần phải chọn kiểu xem")
                                } else {
                                    fetchDataOrderViewDetail(statusViewDetail, typeViewDetail.type)
                                }
                            }}>
                                <FontAwesomeIcon icon={faEye} /> Xem
                            </button>
                        </div>
                    </div>
                    <div className='order__report--search'>
                        <input className='order__report--search--text'
                            type='text'
                            placeholder='Nhập vào mã đơn cần tìm'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className='order__report--table'>
                        <div className='order__report--table--title'>
                            <div className='order__report--table--header'>Mã đơn</div>
                            <div className='order__report--table--header'>Tên Khách hàng</div>
                            <div className='order__report--table--header'>Tên người dùng</div>
                            <div className='order__report--table--header'>Số điện thoại</div>
                            <div className='order__report--table--header'>Ngày đặt hàng</div>
                            <div className='order__report--table--header'>Ngày thay đổi</div>
                            <div className='order__report--table--header'>Giá trị đơn hàng</div>
                            <div className='order__report--table--header'>Trạng thái</div>
                            <div className='order__report--table--header'>Chi tiết</div>
                        </div>
                        <div className='order__report--table--value'>
                            {isLoading ? (
                                <div className="loading-spinner">
                                    <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: '64px', color: '#0d6efd' }} />
                                </div>
                            ) : (
                                dataOrderViewDetail.length > 0 ? (
                                    dataOrderViewDetail.filter((item) => {
                                        // Kiểm tra kiểu dữ liệu của item.orderID
                                        if (typeof item.orderID === 'string') {
                                            return item.orderID.toLowerCase().includes(searchTerm.toLowerCase());
                                        }
                                        // Nếu orderID không phải là chuỗi, chuyển đổi sang chuỗi trước khi kiểm tra
                                        return String(item.orderID).toLowerCase().includes(searchTerm.toLowerCase());
                                    }).map((item) => (
                                        <div className='order__report--table--value--item' key={item.orderID}>
                                            <div className='order__report--table--data'>{item.orderID}</div>
                                            <div className='order__report--table--data'>{item.users.fullName}</div>
                                            <div className='order__report--table--data'>{item.users.userName}</div>
                                            <div className='order__report--table--data'>{item.users.phoneNumber}</div>
                                            <div className='order__report--table--data'>
                                                {`${new Date(item.orderDate).toLocaleDateString('vi-VN', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}, ${new Date(item.orderDate).toLocaleTimeString('vi-VN', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                    second: '2-digit',
                                                    hour12: false
                                                })}`}
                                            </div>
                                            <div className='order__report--table--data'>
                                                {item.statusDate
                                                    ? `${new Date(item.statusDate).toLocaleDateString('vi-VN', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}, ${new Date(item.statusDate).toLocaleTimeString('vi-VN', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        second: '2-digit',
                                                        hour12: false
                                                    })}`
                                                    : ""}
                                            </div>

                                            <div className='order__report--table--data'>{item.TotalAmount.toLocaleString('en-US', { maximumFractionDigits: 3 })} ₫</div>
                                            <div className='order__report--table--data'>{changeDataStatusFromENToVN(item.status)}</div>
                                            <div className='order__report--table--data'>
                                                <button className='button__view--detail' onClick={() => {
                                                    setStatusDisplayOrderDetail(1);
                                                    setInforOrderDetail({
                                                        OrderID: item.orderID,
                                                        order: item
                                                    });
                                                }}>
                                                    <FontAwesomeIcon icon={faEye} />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className='order__report--table--value--item'>
                                        <div className='order__report--table--data'>Trống</div>
                                        <div className='order__report--table--data'>Trống</div>
                                        <div className='order__report--table--data'>Trống</div>
                                        <div className='order__report--table--data'>Trống</div>
                                        <div className='order__report--table--data'>Trống</div>
                                        <div className='order__report--table--data'>Trống</div>
                                        <div className='order__report--table--data'>Trống</div>
                                        <div className='order__report--table--data'>Trống</div>
                                        <div className='order__report--table--data'>
                                            <button className='button__view--detail'>
                                                <FontAwesomeIcon icon={faEye} />
                                            </button>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Order;
