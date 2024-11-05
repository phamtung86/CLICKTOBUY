import { useEffect, useState } from 'react';
import '../../../Style/Admin/Voucher/Voucher.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faPenToSquare, faPlus, faRotate } from '@fortawesome/free-solid-svg-icons';
import ModifyVoucher from './ModifyVoucher';
import AddVoucher from './AddVoucher';

const Voucher = () => {
    const VOUCHER_ACTIVE = 1;
    const VOUCHER_LOCK = 0;
    const DISPLAY_OFF = 0;
    const DISPLAY_ADD_VOUCHER = 1;
    const DISPLAY_MODIFY_VOUCHER = 2;
    const [dataListVouchers, setDataListVouchers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [voucherCode, setVoucherCode] = useState();
    const [voucherId, setVoucherId] = useState();
    const [statusDisplayCRUDVoucher, setStatusDisplayCRUDVoucher] = useState(DISPLAY_OFF); // quản lý trạng thái hiển thị của modify voucher

    const fetchDataVoucher = async () => {
        try {
            const responseData = await axios.get(`http://localhost:8080/api/Vouchers/ListVouchers`);
            setDataListVouchers(responseData.data);
        } catch (error) {
            console.log("Xảy ra lỗi trong quá trình lấy voucher " + error);
        }
    };

    useEffect(() => {
        fetchDataVoucher();
    }, [voucherCode, voucherId]); // Thêm voucherCode và voucherId vào dependency

    const formatDataVoucherType = (type) => {
        switch (type) {
            case "MONEY":
                return "Giá trị tiền";
            case "PERCENT":
                return "Phần trăm";
            default:
                return '';
        }
    };

    const formatDataVoucherValue = (type, value) => {
        switch (type) {
            case "MONEY":
                return value.toLocaleString('vi-VN', { maximumFractionDigits: 3 }) + " ₫";
            case "PERCENT":
                return value + "%";
            default:
                return '';
        }
    };

    const changeStatusDisplayModify = (value) => {
        setStatusDisplayCRUDVoucher(value);
    };

    const handleModifyVoucher = () => {
        if (voucherCode) {
            setStatusDisplayCRUDVoucher(DISPLAY_MODIFY_VOUCHER);
        } else {
            alert('Bạn chưa chọn voucher để sửa');
        }
    };

    const handleChangeStatusVoucher = async (voucherId, status) => {
        try {
            const responseData = await axios.put(`http://localhost:8080/api/Vouchers/status?voucherId=${voucherId}&status=${status}`);
            if (responseData.data) {
                alert("Thay đổi trạng thái thành công");
                fetchDataVoucher();
            }
        } catch (error) {
            console.log("Lỗi xảy ra trong quá trình cập nhật trạng thái voucher", error);
        }
    };

    const checkDateExpiryVoucher = (expiryDate) => {
        return new Date(expiryDate) > new Date() ?"voucher__admin--table--rows":"voucher__admin--table--rows--disable"   
    }
    return (
        <div className='voucher__admin'>
            {statusDisplayCRUDVoucher === 1 &&
                <AddVoucher
                    statusDisplay={changeStatusDisplayModify}
                    reloadData={fetchDataVoucher}
                />}
            {statusDisplayCRUDVoucher === 2 &&
                <ModifyVoucher
                    statusDisplay={changeStatusDisplayModify}
                    voucherCode={voucherCode}
                    reloadData={fetchDataVoucher}
                />}
            <div className='voucher__admin--overview'>
                <div className='voucher__admin--report'>
                    <div className='voucher__admin--report--title'>Tổng số voucher</div>
                    <div className='voucher__admin--report--value'>{dataListVouchers.length}</div>
                </div>
                <div className='voucher__admin--report'>
                    <div className='voucher__admin--report--title'>Đã hết hạn</div>
                    <div className='voucher__admin--report--value'>
                        {dataListVouchers.filter(item => new Date(item.expriryDate) < new Date()).length}
                    </div>
                </div>
                <div className='voucher__admin--report'>
                    <div className='voucher__admin--report--title'>Còn hạn</div>
                    <div className='voucher__admin--report--value'>
                        {dataListVouchers.filter(item => new Date(item.expriryDate) >= new Date()).length}
                    </div>
                </div>
            </div>
            <div className='voucher__admin--function'>
                <div className='action__search'>
                    <span className='action__search--title'>Tìm kiếm</span>
                    <input
                        className='action__search--text'
                        placeholder='Nhập mã voucher cần tìm'
                        value={searchTerm}
                        onChange={(even) => { setSearchTerm(even.target.value); }}
                    />
                </div>
                <div className='box__action--button'>
                    <span className='box__action--title'>Hành động</span>
                    <button className='action__button action__add'
                        onClick={() => { setStatusDisplayCRUDVoucher(DISPLAY_ADD_VOUCHER); }}
                    >
                        <FontAwesomeIcon icon={faPlus} /> Thêm mới
                    </button>
                    <button className='action__button action__lock'
                        onClick={() => { handleModifyVoucher(); }}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} /> Sửa
                    </button>
                    <button className='action__button action__delete'
                        onClick={() => {
                            if (!voucherId) {
                                alert("Bạn chưa chọn voucher để thay đổi trạng thái.");
                                return;
                            } else {
                                if (window.confirm("Bạn có muốn khóa voucher " + voucherCode + " không")) {
                                    handleChangeStatusVoucher(voucherId, VOUCHER_LOCK);
                                }

                            }
                        }}
                    >
                        <FontAwesomeIcon icon={faLock} /> Khóa
                    </button>
                    <button className='action__button action__refresh'
                        onClick={() => { handleChangeStatusVoucher(voucherId, VOUCHER_ACTIVE); }}
                    >
                        <FontAwesomeIcon icon={faRotate} /> Làm mới
                    </button>
                </div>
            </div>
            <div className="voucher__admin--table">
                <div className="voucher__admin--table--header">
                    <div className="voucher__admin--table--title"></div>
                    <div className="voucher__admin--table--title">Mã</div>
                    <div className="voucher__admin--table--title">Tên voucher</div>
                    <div className="voucher__admin--table--title">Giá trị tối thiểu</div>
                    <div className="voucher__admin--table--title">Giá trị tối đa</div>
                    <div className="voucher__admin--table--title">Loại voucher</div>
                    <div className="voucher__admin--table--title">Giá trị</div>
                    <div className="voucher__admin--table--title">Ngày bắt đầu</div>
                    <div className="voucher__admin--table--title">Ngày hết hạn</div>
                </div>
                <div className='voucher__admin--table--body'>
                    {dataListVouchers
                        .filter((item) => item.code.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()))
                        .map((item) => (
                            <div className={checkDateExpiryVoucher(item.expriryDate)} key={item.id}>
                                <div className="voucher__admin--table--data">
                                    <input type="radio" name='select__voucher' onChange={() => {
                                        setVoucherCode(item.code);
                                        setVoucherId(item.id);
                                    }} />
                                </div>
                                <div className="voucher__admin--table--data">{item.code}</div>
                                <div className="voucher__admin--table--data">{item.name}</div>
                                <div className="voucher__admin--table--data">{item.minOrderAmount.toLocaleString('vi-VN', { maximumFractionDigits: 3 })} ₫</div>
                                <div className="voucher__admin--table--data">{item.maxOrderAmount.toLocaleString('vi-VN', { maximumFractionDigits: 3 })} ₫</div>
                                <div className="voucher__admin--table--data">{formatDataVoucherType(item.type)}</div>
                                <div className="voucher__admin--table--data">{formatDataVoucherValue(item.type, item.value)}</div>
                                <div className="voucher__admin--table--data">{new Date(item.createAt).toLocaleDateString('vi-VN')}</div>
                                <div className="voucher__admin--table--data">{new Date(item.expriryDate).toLocaleDateString('vi-VN')}</div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Voucher;
