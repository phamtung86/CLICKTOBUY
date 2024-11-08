import { useState, useEffect } from 'react';
import '../../Style/Customer/OPTInput.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OTPInput = ({ email, handleChangeStatusDisplay }) => {
    const DISPLAY_NONE = 0;
    const [otp, setOtp] = useState('');
    const [response, setResponse] = useState(null);
    const [timeLeft, setTimeLeft] = useState(300); // 5 phút = 300 giây
    const navigate = useNavigate();

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            alert("Mã OTP đã hết hạn. Vui lòng yêu cầu lại mã.");
            handleChangeStatusDisplay(DISPLAY_NONE); // Quay lại trang trước khi hết thời gian
        }
    }, [timeLeft, handleChangeStatusDisplay]);

    const changeStatusDisplay = () => {
        if (handleChangeStatusDisplay) {
            handleChangeStatusDisplay(DISPLAY_NONE);
        }
    };

    const dotEmail = (email) => {
        return email.slice(0, 3) + '...' + email.slice(email.length - 12, email.length);
    };

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };

    const checkInput = (otp) => {
        return otp.trim().length > 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (checkInput(otp)) {
            try {
                const result = await axios.post(`http://localhost:8080/api/Users/resetPassword?code=${otp}`);
                setResponse(result.data);
                if (result.data !== true) {
                    alert(response);
                } else {
                    navigate("/Password");
                }
            } catch (error) {
                console.log("Lỗi trong quá trình lấy mã OTP: " + error);
            }
        } else {
            alert("Bạn chưa nhập mã OTP");
        }
    };

    // Hàm để định dạng thời gian còn lại (phút:giây)
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <div className='otp'>
            <div className='otp__form'>
                <h1 className='otp__title'>Nhập mã xác minh</h1>
                <p className='otp__notice'>OTP đã được gửi tới email {dotEmail(email)}</p>
                <p className='otp__timer'>Thời gian còn lại: {formatTime(timeLeft)}</p>
                <form className="otp-field" onSubmit={handleSubmit}>
                    <input
                        className='otp__input'
                        type="text"
                        value={otp}
                        onChange={handleOtpChange}
                        placeholder="Nhập mã OTP"
                    />
                    <div className='otp__button'>
                        <button className='otp__button--close' type="button" onClick={changeStatusDisplay}>Đóng</button>
                        <button className='otp__button--submit' type="submit">Xác nhận</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OTPInput;
