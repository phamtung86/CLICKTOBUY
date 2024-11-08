import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import '../../Style/Customer/ForgotPass.css';
import OTPInput from "./OTPInput";

const ForgotPass = () => {
    const DISPLAY_NONE = 0;
    const DISPLAY_OTP_INPUT = 1;
    const [statusDisplayOTP, setStatusDisplayOTP] = useState(DISPLAY_NONE);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false); // State cho hiệu ứng chờ

    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Bắt đầu hiệu ứng chờ
        try {
            const result = await axios.post(`http://localhost:8080/api/Users/sendmail?email=${email}`);
            if(result.status === 200) {
                alert("Kiểm tra email để lấy lại mật khẩu");
                setStatusDisplayOTP(DISPLAY_OTP_INPUT);
            }
        } catch (error) {
            console.error(error);
            alert("Có lỗi xảy ra. Vui lòng thử lại.");
        }
        setLoading(false); // Kết thúc hiệu ứng chờ
    };

    const handleChangeStatusDisplay = (value) => {
        setStatusDisplayOTP(value);
    }

    return (
        <div className='page__forgot--pass'>
            {statusDisplayOTP === DISPLAY_OTP_INPUT &&
                <OTPInput
                    email={email}
                    handleChangeStatusDisplay={handleChangeStatusDisplay}
                />
            }
            <div className='forgot--pass'>
                <div className='forgot--pass__header'>
                    <Link to={"/Login"} className='header--back'><i className="fa-solid fa-arrow-left"></i></Link>
                    <h1 className='shop__name'>CLICKTOBUY</h1>
                    <Link to={"/"} className='header--back'><i className="fa-solid fa-house"></i></Link>
                </div>
                <div className='forgot--pass__title'>Quên mật khẩu</div>
                <form className='forgot--pass__form' onSubmit={handleSubmit}>
                    <label className='label__account'>
                        <input
                            type="text"
                            className='account__input'
                            name='email'
                            value={email}
                            onChange={handleChange}
                        />
                        <span className={email.trim().length > 0 ? "account__title1" : "account__title"}>Nhập vào email của bạn</span>
                    </label>
                    <button className='forgot--pass__button' type='submit' disabled={loading}>
                        {loading ? "Đang gửi..." : "Tiếp tục"}
                    </button>
                    <div className='forgot--pass__other'>
                        <span className='forgot--pass__other__title'>Hoặc</span>
                    </div>
                    <Link className='register_button' to={'/Register'}>Đăng kí</Link>
                </form>
            </div>
        </div>
    );
};

export default ForgotPass;
