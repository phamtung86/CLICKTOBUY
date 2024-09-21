import { format, min } from 'date-fns';
import { vi } from 'date-fns/locale';
import '../../Style/Voucher.css';
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

const Voucher = ({ statusVoucher, onStatusChange, onVoucherSelect, valueBill }) => { 
    const [dataVoucher, setDataVoucher] = useState([]);
    const [valueSearchInput, setValueSearchInput] = useState(''); // Khởi tạo với chuỗi rỗng
    const [statusSelectVoucher, setStatusSelectVoucher] = useState({
        id : "",
        status : 1,
    });
    useEffect(() => {
        const fetchDataVouchers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/Vouchers');
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

    const VoucherDetail = ({ id, name, code, expiryDate, value,minOrderAmount,maxOrderAmount, type, onSelect, statusSelect }) => {
        const checkRequireVoucher = () => {
            return valueBill >= minOrderAmount && valueBill <= maxOrderAmount;
        }
        const handleClick = () => {
            if (statusSelect.id === id && statusSelect.status === 0) {
                // Khi hủy chọn voucher 
                // status = 0 là hủy áp dụng
                onSelect(null, 0,minOrderAmount,maxOrderAmount);    
                setStatusSelectVoucher({ id: "", status: 1}); 
            } else {
                // Khi chọn voucher
                onSelect(id, value,minOrderAmount,maxOrderAmount);
                setStatusSelectVoucher({ id: id, status: 0 });
            }
        };
        useEffect(() => {
            const checkTotalBill = (event) => {
                if (statusSelectVoucher.id) {
                    const selectedVoucher = dataVoucher.find(v => v.vouchers.id === statusSelectVoucher.id);
                    if (selectedVoucher && (valueBill < selectedVoucher.vouchers.minOrderAmount || valueBill > selectedVoucher.vouchers.maxOrderAmount)) {
                        window.alert("Voucher " + selectedVoucher.vouchers.name + " đã bị hủy do không đáp ứng điều kiện")
                        onVoucherSelect(null, 0, selectedVoucher.vouchers.minOrderAmount, selectedVoucher.vouchers.maxOrderAmount);    
                        setStatusSelectVoucher({ id: "", status: 1 }); 
                    }
                }
            };
            checkTotalBill();
        }, [valueBill, dataVoucher, statusSelectVoucher.id, onVoucherSelect]);
        const formattedDate = expiryDate ? format(new Date(expiryDate), 'dd MMMM yyyy', { locale: vi }) : 'Ngày không hợp lệ'; 
        
        return (
            <div className="voucher__detail">
                <div className="voucher__detail--info">
                    <div className="voucher__detail__code">Voucher: {code}</div>
                    <div className="voucher__detail__name">{name}</div>
                    <div className="voucher__detail__expiryDate">HSD: {(expiryDate <= Date()) ? formattedDate : "Đã hết hạn"}</div>
                    <div className="voucher__detail__Type">Giảm: {(type === 2) ? value + " ₫" : value + "%"}</div>
                    <div className='voucher__detail__require'>{minOrderAmount || maxOrderAmount ? "Áp dụng cho đơn hàng từ " + minOrderAmount.toLocaleString('en-US', { maximumFractionDigits: 3 }) + "₫ đến " + maxOrderAmount.toLocaleString('en-US', { maximumFractionDigits: 3 }) + "₫" : "" }</div>
                </div>
                <button 
                    className={statusSelect.id === id && statusSelect.status === 0 
                            ? 'button__selected__voucher' 
                            : 'button__select__voucher'}value={value} 
                            onClick={handleClick}
                            disabled = {checkRequireVoucher() === false || expiryDate > Date()}
                            >
                    {statusSelect.id === id && statusSelect.status === 0 ? "Hủy áp dụng" : "Áp dụng"}
                </button>
            </div>
        );
    };
    
    // Lọc kết quả tìm kiếm
    const resultSearch = dataVoucher
        .filter(element => element.vouchers?.name.toLowerCase().startsWith(valueSearchInput.toLowerCase()))
        .map(element => (
            <VoucherDetail
                id={element.vouchers?.id}
                key={element.id}
                name={element.vouchers?.name}
                code={element.vouchers?.code}
                expiryDate={element.vouchers?.expriryDate}
                value={element.value}
                type={element.voucherDetailType?.id} // id = 1 la PERCENT , id = 2 la MONEY
                onSelect={onVoucherSelect}
                statusSelect={statusSelectVoucher}
                minOrderAmount={element.vouchers?.minOrderAmount}
                maxOrderAmount={element.vouchers?.maxOrderAmount}
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
                            id={voucher.vouchers.id}
                            key={voucher.id}
                            name={voucher.vouchers.name}
                            code={voucher.vouchers.code}
                            expiryDate={voucher.vouchers.expriryDate} 
                            value={voucher.value}
                            type={voucher.voucherDetailType.id} // id = 1 la PERCENT , id = 2 la MONEY
                            onSelect={onVoucherSelect}
                            statusSelect={statusSelectVoucher}
                            minOrderAmount={voucher.vouchers?.minOrderAmount}
                            maxOrderAmount={voucher.vouchers?.maxOrderAmount}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Voucher;
