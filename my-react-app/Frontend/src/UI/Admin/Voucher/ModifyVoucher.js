import axios from 'axios';
import { useEffect, useState } from 'react';
import '../../../Style/Admin/Voucher/ModifyVoucher.css';

const ModifyVoucher = ({ statusDisplay, voucherCode, reloadData }) => {
    const [dataVoucherByVoucherCode, setDataVoucherByVoucherCode] = useState({});

    const fetchDataVoucherByVoucherCode = async (voucherCode) => {
        try {
            const result = await axios.get(`http://localhost:8080/api/Vouchers/VoucherByID?voucherCode=${voucherCode}`);
            setDataVoucherByVoucherCode(result.data);
        } catch (error) {
            console.log("Lỗi trong quá trình lấy voucher theo code: " + error);
        }
    };

    useEffect(() => {
        if (voucherCode) {
            fetchDataVoucherByVoucherCode(voucherCode);
        }
    }, [voucherCode]);

    const [dataCurrentVoucherByVoucherCode, setDataCurrentVoucherByVoucherCode] = useState({});

    useEffect(() => {
        setDataCurrentVoucherByVoucherCode({
            id: dataVoucherByVoucherCode.id || '',
            code: dataVoucherByVoucherCode.code || '',
            name: dataVoucherByVoucherCode.name || '',
            minOrderAmount: dataVoucherByVoucherCode.minOrderAmount || '',
            maxOrderAmount: dataVoucherByVoucherCode.maxOrderAmount || '',
            createAt: dataVoucherByVoucherCode.createAt ? new Date(dataVoucherByVoucherCode.createAt).toISOString().split('T')[0] : '',
            expiryDate: dataVoucherByVoucherCode.expriryDate ? new Date(dataVoucherByVoucherCode.expriryDate).toISOString().split('T')[0] : '',
            type: dataVoucherByVoucherCode.type || '',
            value: dataVoucherByVoucherCode.value || ''
        });
    }, [dataVoucherByVoucherCode]);

    // Hàm xử lý thay đổi cho các input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataCurrentVoucherByVoucherCode({
            ...dataCurrentVoucherByVoucherCode,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        let check = true;
        const minOrderAmount = parseFloat(dataCurrentVoucherByVoucherCode.minOrderAmount);
        const maxOrderAmount = parseFloat(dataCurrentVoucherByVoucherCode.maxOrderAmount);
    
        if (isNaN(minOrderAmount) || isNaN(maxOrderAmount)) {
            alert('Giá trị tối thiểu và tối đa phải là số hợp lệ');
            check = false;
            return;
        }
    
        if (minOrderAmount >= maxOrderAmount) {
            alert('Giá trị tối đa phải lớn hơn giá trị tối thiểu');
            check = false;
            return;
        }
    
        if (check) {
            const voucherUpdate = dataCurrentVoucherByVoucherCode;        
            try {
                const response = await axios.put(`http://localhost:8080/api/Vouchers/vouchers`, voucherUpdate);
                console.log(response.data);
                
                if(response.data === true) {
                    reloadData();  // Gọi lại hàm reloadData để cập nhật danh sách sau khi sửa
                    alert('Sửa voucher thành công')
                    changeStatusDisplay(0)
                }
            } catch (error) {
                console.log("Lỗi khi cập nhật voucher: " + error);
            }
        }
    };
    

    const changeStatusDisplay = () => {
        if (statusDisplay) {
            statusDisplay(0);
        }
    };

    return (
        <div className='voucher__CRUD'>
            <h2 className='voucher__CRUD--title'>Sửa thông tin voucher</h2>
            <div className='voucher__CRUD--form'>
                <div className='voucher__CRUD--element'>
                    <label>ID</label>
                    <input 
                        className='voucher__CRUD--element--input' 
                        type='text'
                        value={dataCurrentVoucherByVoucherCode.id}
                        disabled
                    />
                </div>
                <div className='voucher__CRUD--element'>
                    <label>Mã voucher</label>
                    <input 
                        className='voucher__CRUD--element--input' 
                        type='text'
                        name='code'
                        value={dataCurrentVoucherByVoucherCode.code}
                        disabled
                    />
                </div>
                <div className='voucher__CRUD--element'>
                    <label>Tên voucher</label>
                    <input 
                        className='voucher__CRUD--element--input' 
                        type='text'
                        name='name'
                        value={dataCurrentVoucherByVoucherCode.name}
                        onChange={handleChange}
                    />
                </div>
                <div className='voucher__CRUD--element'>
                    <label>Giá trị tối thiểu</label>
                    <input 
                        className='voucher__CRUD--element--input' 
                        type='text'
                        name='minOrderAmount'
                        value={dataCurrentVoucherByVoucherCode.minOrderAmount}
                        onChange={handleChange}
                    />
                </div>
                <div className='voucher__CRUD--element'>
                    <label>Giá trị tối đa</label>
                    <input 
                        className='voucher__CRUD--element--input' 
                        type='text'
                        name='maxOrderAmount'
                        value={dataCurrentVoucherByVoucherCode.maxOrderAmount}
                        onChange={handleChange}
                    />
                </div>
                <div className='voucher__CRUD--element'>
                    <label>Ngày bắt đầu (MM- DD - YYYY)</label>
                    <input 
                        className='voucher__CRUD--element--input' 
                        type='date'
                        name='createAt'
                        value={dataCurrentVoucherByVoucherCode.createAt}
                        onChange={handleChange}
                    />
                </div>
                <div className='voucher__CRUD--element'>
                    <label>Ngày kết thúc (MM- DD - YYYY)</label>
                    <input 
                        className='voucher__CRUD--element--input' 
                        type='date'
                        name='expiryDate'
                        value={dataCurrentVoucherByVoucherCode.expiryDate}
                        onChange={handleChange}
                    />
                </div>
                <div className='voucher__CRUD--element'>
                    <label>Kiểu voucher (PERCENT | MONEY)</label>
                    <select className='voucher__CRUD--element--input' name='type' onChange={handleChange} value={dataCurrentVoucherByVoucherCode.type}>
                        <option value="PERCENT">PERCENT</option>
                        <option value="MONEY">MONEY</option>
                    </select>
                    {/* <input 
                        className='voucher__CRUD--element--input' 
                        type='text'
                        name='type'
                        value={dataCurrentVoucherByVoucherCode.type}
                        onChange={handleChange}
                    /> */}
                </div>               
                <div className='voucher__CRUD--element'>
                    <label>Giá trị voucher</label>
                    <input 
                        className='voucher__CRUD--element--input' 
                        type='text'
                        name='value'  // Đã sửa lại name thành "value"
                        value={dataCurrentVoucherByVoucherCode.value}
                        onChange={handleChange}
                    />
                </div>               
            </div>
            <div className='voucher__CRUD--button'>
                <button className='voucher__CRUD--button--close' onClick={changeStatusDisplay}>Đóng</button>
                <button className='voucher__CRUD--button--submit' onClick={handleSubmit}>Lưu thay đổi</button>
            </div>
        </div>
    );
};

export default ModifyVoucher;
