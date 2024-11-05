import axios from 'axios'
import '../../../Style/Admin/Inventory/ImportInventoryHistory.css'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const TYPE_DATE_ALL = "ALL";
const TYPE_DATE_TODAY = "DAY";
const TYPE_DATE_MONTH = "MONTH";
const TYPE_DATE_YEAR = "YEAR";
const DISPLAY_NONE = 0;
const ImportInventoryHistory = ({ manageStatusDisplay }) => {
    const [dataImportHistory, setDataImportHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const fetchImportHistoryData = async (type) => {
        setIsLoading(true);
        try {
            const result = await axios.get(`http://localhost:8080/api/ImportInventorys/importInventorys?type=${type}`)
            setDataImportHistory(result.data)
        } catch (error) {
            alert("Lỗi xảy ra trong quá trình lấy dữ liệu nhập hàng");
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchImportHistoryData(TYPE_DATE_ALL);
    }, [])

    const changeManageStatusDisplay = () => {
        if (manageStatusDisplay) {
            manageStatusDisplay(DISPLAY_NONE);
        }
    };

    return (
        <div className='import__history'>
            <h1 className='import__history--title'>Lịch sử nhập hàng</h1>
            <div className='table__header'>
                <div className='table__header--title'>Mã</div>
                <div className='table__header--title'>Hình ảnh</div>
                <div className='table__header--title'>Tên sản phẩm</div>
                <div className='table__header--title'>Giá</div>
                <div className='table__header--title'>Số lượng</div>
                <div className='table__header--title'>Thời gian
                    <select className='export__time--select' onChange={(e) => fetchImportHistoryData(e.target.value)}>
                        <option value={TYPE_DATE_ALL}>Tất cả</option>
                        <option value={TYPE_DATE_TODAY}>Hôm nay</option>
                        <option value={TYPE_DATE_MONTH}>Tháng</option>
                        <option value={TYPE_DATE_YEAR}>Năm</option>
                    </select>
                </div>
                <div className='table__header--title'>Người tạo</div>
            </div>
            {isLoading ? ( // Hiển thị spinner khi đang tải dữ liệu
                <div className="loading-spinner">
                    <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: '64px', color: '#0d6efd' }} />
                </div>
            ) : (
                <div className='import__history--table'>
                    <div className='table__data'>
                        {dataImportHistory.length > 0 ? dataImportHistory
                            // .filter((item) => item.products.productName.toLowerCase().includes(searchTerm.toLowerCase()) || item.productName.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((item) => (
                                <div className='table__rows' key={item.products.productId}>
                                    <div className='table__rows--data'>
                                        {item.id}
                                    </div>
                                    <div className='table__rows--data'>
                                        <img src={item.products.productImageLink} alt="Product" className='inventtory__product--image' />
                                    </div>
                                    <div className='table__rows--data'>{item.products.productName}</div>
                                    <div className='table__rows--data'>{item.products.productPrice.toLocaleString('vi-VN', { maximumFractionDigits: 3 })}₫</div>
                                    <div className='table__rows--data'>{item.quantity}</div>
                                    <div className='table__rows--data'>
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
                                    <div className='table__rows--data'>{item.createBy}</div>
                                </div>
                            )) :  <div className='table__no-data'>Không có dữ liệu nhập hàng</div>
                        }
                    </div>
                    <div className='import__history--button'>
                        <button type='button' className='import__form--button--close' onClick={changeManageStatusDisplay}>Đóng</button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default ImportInventoryHistory