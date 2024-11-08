import { faLock, faPlus, faRotate, faSpinner, faTrashCan, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../Style/Admin/Account/Account.css';

const Account = () => {
    const [dataListUsers, setDataListUsers] = useState([]);
    const [dataListUsersWithPaging, setDataListUsersWithPaging] = useState([]);
    const [userId, setUserId] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const totalPages = dataListUsers.length/10 + 1; 

    const fetchDataListUser = async () => {
        setLoading(true);
        try {
            const responseData = await axios.get(`http://localhost:8080/api/Users/getAllUser`);
            setDataListUsers(responseData.data);
        } catch (error) {
            console.log("Lỗi trong quá trình lấy data user: " + error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(()=> {
        fetchDataListUser();
    },[])
    const fetchDataListUserWithPaging = async (page) => {
        setLoading(true);
        try {
            const responseData = await axios.get(`http://localhost:8080/api/Users/UsersPaging?page=${page}`);
            setDataListUsersWithPaging(responseData.data);
        } catch (error) {
            console.log("Lỗi trong quá trình lấy data user: " + error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataListUserWithPaging(page);
    }, [page]);

    const changeStatusAccount = (value) => {
        switch (value) {
            case -5:
                return <span className='account__status__table account__status__disable'>Vô hiệu hóa</span>;
            case 1:
                return <span className='account__status__table account__status__active'>Hoạt động</span>;
            case -9:
                return <span className='account__status__table account__status__warning'>Cảnh báo</span>;
            case -1:
                return <span className='account__status__table account__status__lock'>Khóa</span>;
            default:
                return null;
        }
    }

    const totalInactiveUsers = (valueStatus) => {
        return dataListUsers.filter(item => item.status === valueStatus && item.role === "CUSTOMER").length;
    }
    const updateAccountStatus = async (status) => {
        if (!userId) {
            alert("Bạn chưa chọn người dùng");
            return;
        }
        try {
            const updateUser = await axios.put(`http://localhost:8080/api/Users/updateStatusUser?status=${status}&userID=${userId}`);
            if (updateUser.status === 200) {
                alert("Cập nhật trạng thái thành công");
                fetchDataListUser();
            } else {
                alert("Lỗi xảy ra trong quá trình cập nhật trạng thái");
            }
        } catch (error) {
            console.log("Lỗi xảy ra trong quá trình cập nhật trạng thái: " + error);
        }
    }
    const getPaginationItems = () => {
        const paginationItems = [];
        if (totalPages <= 7) {
            // Hiển thị tất cả nếu tổng trang <= 7
            for (let i = 1; i <= totalPages; i++) {
                paginationItems.push(i);
            }
        } else {
            if (page <= 4) {
                // Hiển thị các trang đầu và dấu "..."
                paginationItems.push(1, 2, 3, 4, 5, '...', totalPages);
            } else if (page > totalPages - 4) {
                // Hiển thị các trang cuối và dấu "..."
                paginationItems.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                // Hiển thị dấu "..." hai bên trang hiện tại
                paginationItems.push(1, '...', page - 1, page, page + 1, '...', totalPages);
            }
        }
        return paginationItems;
    };

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    return (
        <div className="account">
            <div className="account__report--status">
                <div className="account--status account--status--active">
                    <div className="account--status--number">{totalInactiveUsers(1)}</div>
                    <div className="account--status--title">Hoạt động</div>
                </div>
                <div className="account--status account--status--warning">
                    <div className="account--status--number">{totalInactiveUsers(-9)}</div>
                    <div className="account--status--title">Cảnh báo</div>
                </div>
                <div className="account--status account--status--block">
                    <div className="account--status--number">{totalInactiveUsers(-1)}</div>
                    <div className="account--status--title">Khóa</div>
                </div>
                <div className="account--status account--status--disable">
                    <div className="account--status--number">{totalInactiveUsers(-5)}</div>
                    <div className="account--status--title">Vô hiệu hóa</div>
                </div>
            </div>

            <div className="account__list">
                <div className="account__list--title">Danh sách người dùng</div>
                <div className='account__list--action'>
                    <div className='action__search'>
                        <span className='action__search--title'>Tìm kiếm</span>
                        <input
                            className='action__search--text'
                            placeholder='Nhập người dùng cần tìm'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className='box__action--button'>
                        <span className='box__action--title'>Hành động</span>
                        <button className='action__button action__add' onClick={() => navigate('/Register')}><FontAwesomeIcon icon={faPlus} /> Thêm mới</button>
                        <button className='action__button action__delete' onClick={() => updateAccountStatus(-5)}><FontAwesomeIcon icon={faTrashCan} /> Xóa</button>
                        <button className='action__button action__lock' onClick={() => updateAccountStatus(-1)}><FontAwesomeIcon icon={faLock} /> Khóa</button>
                        <button className='action__button action__warnning' onClick={() => updateAccountStatus(-9)}><FontAwesomeIcon icon={faTriangleExclamation} /> Cảnh báo</button>
                        <button className='action__button action__refresh' onClick={() => updateAccountStatus(1)}><FontAwesomeIcon icon={faRotate} /> Làm mới</button>
                    </div>
                </div>

                <div className="account__list--table">
                    <div className="table__rows--header table__list--rows">
                        <div className="account__list--header"></div>
                        <div className="account__list--header">ID</div>
                        <div className="account__list--header">Họ tên</div>
                        <div className="account__list--header">Tên người dùng</div>
                        <div className="account__list--header">Email</div>
                        <div className="account__list--header">Số điện thoại</div>
                        <div className="account__list--header">Địa chỉ</div>
                        <div className="account__list--header">Trạng thái</div>
                        <div className="account__list--header">Ngày tạo</div>
                    </div>
                    <div>
                        {loading ? (
                            <div className="loading-spinner">
                                <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: '64px', color: '#0d6efd' }} />
                            </div>
                        ) : (
                            <div>
                                {dataListUsersWithPaging
                                    .filter((item) =>
                                        item.role === "CUSTOMER" &&
                                        item.userName.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .map((item) => (
                                        <div className="table__list--rows" key={item.userID}>
                                            <div className="account__list--data">
                                                <input type="radio" name='select__user' onClick={() => setUserId(item.userID)} />
                                            </div>
                                            <div className="account__list--data">{item.userID}</div>
                                            <div className="account__list--data">{item.fullName}</div>
                                            <div className="account__list--data">{item.userName}</div>
                                            <div className="account__list--data">{item.email}</div>
                                            <div className="account__list--data">{item.phoneNumber}</div>
                                            <div className="account__list--data">{item.address.startsWith(',') ? item.address.substring(1) : item.address}</div>
                                            <div className="account__list--data">{changeStatusAccount(item.status)}</div>
                                            <div className="account__list--data">{new Date(item.createAt).toLocaleDateString('vi-VN')}</div>
                                        </div>
                                    ))}
                                {/* Mã hiển thị dữ liệu người dùng */}
                            </div>
                        )}
                    </div>
                </div>
                <div id="app" className="container">
                    <ul className="page">
                        <li className="page__btn" onClick={handlePreviousPage}>Sau</li>
                        {getPaginationItems().map((item, index) => (
                            <li
                                key={index}
                                className={page === item ? "page__numbers active" : "page__numbers"}
                                onClick={() => typeof item === 'number' && setPage(item)}
                            >
                                {item}
                            </li>
                        ))}
                        <li className="page__btn" onClick={handleNextPage}>Tiếp</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Account;
