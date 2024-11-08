import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../Style/Customer/Voucher.css';

const Voucher = ({ statusVoucher, onStatusChange, onVoucherSelect, valueBill, statusOrder }) => {
    const VOUCHER_ACTIVE = 1;
    const VOUCHER_LOCK = 0;
    const [dataVoucher, setDataVoucher] = useState([]);
    const [valueSearchInput, setValueSearchInput] = useState(''); // Khởi tạo với chuỗi rỗng
    const [statusSelectVoucher, setStatusSelectVoucher] = useState({
        id: "",
        status: 1,
    });

    useEffect(() => {
        const fetchDataVouchers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/Vouchers/ListVouchers');
                setDataVoucher(response.data);

            } catch (error) {
                console.log("Error get data voucher: " + error);
            }
        };
        fetchDataVouchers();
    }, []);

    const handleGetChangeValueSearch = (event) => {
        setValueSearchInput(event.target.value);
    };

    const handleChangeStatus = () => {
        if (onStatusChange) {
            onStatusChange(0);
        }
    };

    const VoucherDetail = ({ id, name, code, expiryDate, value, minOrderAmount, maxOrderAmount, type, onSelect, statusSelect }) => {
        const checkRequireVoucher = () => {
            return valueBill >= minOrderAmount && valueBill <= maxOrderAmount;
        }
        const handleClick = () => {
            if (statusSelect.id === id && statusSelect.status === 0) {
                // Khi hủy chọn voucher 
                // status = 0 là hủy áp dụng
                onSelect(null, 0, minOrderAmount, maxOrderAmount);
                setStatusSelectVoucher({ id: "", status: 1 });
            } else {
                // Khi chọn voucher
                onSelect(id, value, minOrderAmount, maxOrderAmount, code);
                setStatusSelectVoucher({ id: id, status: 0 });
            }
        };
        useEffect(() => {
            const checkTotalBill = () => {
                if (statusSelectVoucher.id) {
                    const selectedVoucher = dataVoucher.find(v => v.id === statusSelectVoucher.id);
                    if (statusOrder === 0) {
                        if (selectedVoucher && (valueBill < selectedVoucher.minOrderAmount || valueBill > selectedVoucher.maxOrderAmount)) {
                            window.alert("Voucher " + selectedVoucher.name + " đã bị hủy do không đáp ứng điều kiện")
                            onVoucherSelect(null, 0, selectedVoucher.minOrderAmount, selectedVoucher.maxOrderAmount);
                            setStatusSelectVoucher({ id: "", status: 1 });
                        }
                    }
                    if (statusOrder === 1) {
                        onVoucherSelect(null, 0, selectedVoucher.minOrderAmount, selectedVoucher.maxOrderAmount);
                        setStatusSelectVoucher({ id: "", status: 1 });
                    }
                }
            };
            checkTotalBill();
        }, [valueBill, dataVoucher, statusSelectVoucher.id, onVoucherSelect, statusOrder]);

        const formatExprityDate = (expiryDate) => {
            if (new Date(expiryDate) > new Date()) {
                return <span className='voucher__detail__expiryDate--span'>HSD: {new Date(expiryDate).toLocaleDateString('vi-VN')}</span>
            } else {
                return <span className='voucher__detail__expiryDate--span'>Đã hết hạn</span>
            }
        }
        return (
            <div className="voucher__detail">
                <div className="voucher__detail--info">
                    <div className="voucher__detail__code">Voucher: {code}</div>
                    <div className="voucher__detail__name">{name}</div>
                    <span className="voucher__detail__expiryDate">{formatExprityDate(expiryDate)}</span>
                    <div className="voucher__detail__Type">Giảm: {(type === 2) ? value + " ₫" : value + "%"}</div>
                    <div className='voucher__detail__require'>{minOrderAmount || maxOrderAmount ? "Áp dụng cho đơn hàng từ " + minOrderAmount.toLocaleString('en-US', { maximumFractionDigits: 3 }) + "₫ đến " + maxOrderAmount.toLocaleString('en-US', { maximumFractionDigits: 3 }) + "₫" : ""}</div>
                </div>
                <button
                    className={statusSelect.id === id && statusSelect.status === 0
                        ? 'button__selected__voucher'
                        : 'button__select__voucher'} value={value}
                    onClick={handleClick}
                    disabled={checkRequireVoucher() === false || expiryDate >= Date()}
                >
                    {statusSelect.id === id && statusSelect.status === 0 ? "Hủy áp dụng" : "Áp dụng"}
                </button>
            </div>
        );
    };

    // Lọc kết quả tìm kiếm
    const resultSearch = dataVoucher
        .filter(element => element.status === VOUCHER_ACTIVE && new Date(element.createAt)<= new Date() && element.name.toLowerCase().startsWith(valueSearchInput.toLowerCase()))
        .map(element => (
            <VoucherDetail
                id={element.id}
                key={element.id}
                name={element.name}
                code={element.code}
                expiryDate={element.expriryDate}
                value={element.value}
                type={element.type} 
                onSelect={onVoucherSelect}
                statusSelect={statusSelectVoucher}
                minOrderAmount={element.minOrderAmount}
                maxOrderAmount={element.maxOrderAmount}
            />
        ));

    return (
        <div className={statusVoucher === 1 ? "voucher" : "voucher__none"}>
            <div className="voucher__interface">
                <div className="voucher__search">
                    <Link className="back__cart" onClick={handleChangeStatus}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </Link>
                    <input
                        className="search__voucher--text"
                        type="text"
                        name="searchvoucher"
                        placeholder="Nhập voucher cần tìm"
                        value={valueSearchInput}
                        onChange={handleGetChangeValueSearch}
                    />
                    <input
                        className="search__button"
                        type="button"
                        value="Tìm kiếm"
                    />
                </div>
                <div className="search__results">
                    {resultSearch.length > 0 ? resultSearch : dataVoucher.map(voucher => (
                        <VoucherDetail
                            id={voucher.id}
                            key={voucher.id}
                            name={voucher.name}
                            code={voucher.code}
                            expiryDate={voucher.expriryDate}
                            value={voucher.value}
                            type={voucher.id} 
                            onSelect={onVoucherSelect}
                            statusSelect={statusSelectVoucher}
                            minOrderAmount={voucher?.minOrderAmount}
                            maxOrderAmount={voucher?.maxOrderAmount}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Voucher;
