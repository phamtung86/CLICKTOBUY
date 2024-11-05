import axios from 'axios';
import '../../../Style/Admin/Voucher/ModifyVoucher.css';
import { useEffect, useState } from 'react';

const AddVoucher = ({ statusDisplay, reloadData }) => {
    const [dataNewVoucher, setDataNewVoucher] = useState({
        code: '',
        name: '',
        minOrderAmount: '',
        maxOrderAmount: '',
        createAt: '',
        expiryDate: '',
        type: 'PERCENT',  // Đặt mặc định là "PERCENT"
        value: '',
    });

    // Hàm xử lý thay đổi cho các input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataNewVoucher({
            ...dataNewVoucher,
            [name]: value
        });
    };

    const checkInputVoucher = () => {
        return dataNewVoucher.code 
        && dataNewVoucher.createAt 
        && dataNewVoucher.minOrderAmount 
        && dataNewVoucher.maxOrderAmount 
        && dataNewVoucher.createAt
        && dataNewVoucher.expiryDate
        && dataNewVoucher.value
        && dataNewVoucher.type
    }
    const handleSubmit = async () => {
        let check = true;
        const minOrderAmount = parseFloat(dataNewVoucher.minOrderAmount);
        const maxOrderAmount = parseFloat(dataNewVoucher.maxOrderAmount);

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
        if(!checkInputVoucher()) {
            alert("Vui lòng điền đủ thông tin voucher");
            check = false;
            return;
        }

        if (check) {
            try {
                const response = await axios.post('http://localhost:8080/api/Vouchers/vouchers', dataNewVoucher);
                console.log(response.data);

                if (response.data === true) {
                    reloadData();  // Gọi lại hàm reloadData để cập nhật danh sách sau khi thêm
                    alert('Thêm voucher thành công');
                    changeStatusDisplay();
                }
            } catch (error) {
                console.log('Lỗi khi thêm voucher: ' + error);
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
            <h2 className='voucher__CRUD--title'>Thêm voucher</h2>
            <div className='voucher__CRUD--form'>
                {/* Các phần tử đầu vào */}
                <div className='voucher__CRUD--element'>
                    <label>Mã voucher</label>
                    <input
                        className='voucher__CRUD--element--input'
                        type='text'
                        name='code'
                        onChange={handleChange}
                    />
                </div>
                <div className='voucher__CRUD--element'>
                    <label>Tên voucher</label>
                    <input
                        className='voucher__CRUD--element--input'
                        type='text'
                        name='name'
                        onChange={handleChange}
                    />
                </div>
                <div className='voucher__CRUD--element'>
                    <label>Giá trị tối thiểu</label>
                    <input
                        className='voucher__CRUD--element--input'
                        type='text'
                        name='minOrderAmount'
                        onChange={handleChange}
                    />
                </div>
                <div className='voucher__CRUD--element'>
                    <label>Giá trị tối đa</label>
                    <input
                        className='voucher__CRUD--element--input'
                        type='text'
                        name='maxOrderAmount'
                        onChange={handleChange}
                    />
                </div>
                <div className='voucher__CRUD--element'>
                    <label>Ngày bắt đầu</label>
                    <input
                        className='voucher__CRUD--element--input'
                        type='date'
                        name='createAt'
                        onChange={handleChange}
                    />
                </div>
                <div className='voucher__CRUD--element'>
                    <label>Ngày kết thúc</label>
                    <input
                        className='voucher__CRUD--element--input'
                        type='date'
                        name='expiryDate'
                        onChange={handleChange}
                    />
                </div>
                <div className='voucher__CRUD--element'>
                    <label>Kiểu voucher (PERCENT | MONEY)</label>
                    <select className='voucher__CRUD--element--input' name='type' onChange={handleChange} value={dataNewVoucher.type}>
                        <option value="PERCENT">PERCENT</option>
                        <option value="MONEY">MONEY</option>
                    </select>
                </div>
                <div className='voucher__CRUD--element'>
                    <label>Giá trị voucher</label>
                    <input
                        className='voucher__CRUD--element--input'
                        type='text'
                        name='value'
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

export default AddVoucher;
