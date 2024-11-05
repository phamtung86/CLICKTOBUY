import axios from 'axios'
import '../../../Style/Admin/Inventory/ExportInventoryHistory.css'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const TYPE_DATE_ALL = "ALL";
const TYPE_DATE_TODAY = "DAY";
const TYPE_DATE_MONTH = "MONTH";
const TYPE_DATE_YEAR = "YEAR";
const DISPLAY_NONE = 0;
const ExportInventoryHistory = ({ manageStatusDisplay }) => {
    const [dataExportHistory, setDataExportHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const fetchExportHistoryData = async (type) => {
        setIsLoading(true);
        console.log(type);

        try {
            const result = await axios.get(`http://localhost:8080/api/ExportInventories/ExportInventories?type=${type}`)
            setDataExportHistory(result.data)
        } catch (error) {
            alert("Lỗi xảy ra trong quá trình lấy dữ liệu xuất hàng");
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchExportHistoryData(TYPE_DATE_ALL);
    }, [])

    const changeManageStatusDisplay = () => {
        if (manageStatusDisplay) {
            manageStatusDisplay(DISPLAY_NONE);
        }
    };

    return (
        <div className='export__history'>
            <h1 className='export__history--title'>Lịch sử xuất hàng</h1>

            <div className='export__history--table'>
                <div className='table__header'>
                    <div className='table__export__header--title'>Mã xuất</div>
                    <div className='table__export__header--title'>Hình ảnh</div>
                    <div className='table__export__header--title'>Tên sản phẩm</div>
                    <div className='table__export__header--title'>Giá</div>
                    <div className='table__export__header--title'>Số lượng</div>
                    <div className='table__export__header--title'>Thời gian
                        <select className='export__time--select' onChange={(e) => fetchExportHistoryData(e.target.value)}>
                            <option value={TYPE_DATE_ALL}>Tất cả</option>
                            <option value={TYPE_DATE_TODAY}>Hôm nay</option>
                            <option value={TYPE_DATE_MONTH}>Tháng</option>
                            <option value={TYPE_DATE_YEAR}>Năm</option>
                        </select>
                    </div>
                    <div className='table__export__header--title'>Mã đơn hàng</div>
                    <div className='table__export__header--title'>Người tạo</div>
                </div>
                {isLoading ? ( // Hiển thị spinner khi đang tải dữ liệu
                    <div className="loading-spinner">
                        <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: '64px', color: '#0d6efd' }} />
                    </div>
                ) : (
                    <div className='table__data'>
                        {dataExportHistory.length > 0 ? dataExportHistory
                            .map((item) => (
                                <div className='table__rows' key={item.id}>
                                    <div className='table__export__rows--data'>
                                        {item.id}
                                    </div>
                                    <div className='table__export__rows--data'>
                                        <img src={item.products.productImageLink} alt="Product" className='inventtory__product--image' />
                                    </div>
                                    <div className='table__export__rows--data'>{item.products.productName}</div>
                                    <div className='table__export__rows--data'>{item.products.productPrice.toLocaleString('vi-VN', { maximumFractionDigits: 3 })}₫</div>
                                    <div className='table__export__rows--data'>{item.orderDetail.quantity}</div>
                                    <div className='table__export__rows--data'>
                                        {new Date(item.date).toLocaleDateString('vi-VN', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}, {new Date(item.date).toLocaleTimeString('vi-VN', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                            hour12: true,
                                        })}

                                    </div>
                                    <div className='table__export__rows--data'>{item.orderDetail.orderID}</div>
                                    <div className='table__export__rows--data'>{item.userCreate.userName}</div>
                                </div>
                            )) : <div className='table__no-data'>Không có dữ liệu xuất hàng</div>
                        }
                    </div>
                )}
                <div className='export__history--button'>
                    <button type='button' className='import__form--button--close' onClick={changeManageStatusDisplay}>Đóng</button>
                </div>
            </div>
        </div>
    )
}
export default ExportInventoryHistory