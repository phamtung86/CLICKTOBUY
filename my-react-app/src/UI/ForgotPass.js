import { Link } from "react-router-dom";
import '../Style/ForgotPass.css';
import { useEffect, useState } from "react";
import axios from "axios";

const ForgotPass = () => {
    const [dataPhoneNumber, setDataPhoneNumber] = useState({
        phoneNumber: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDataPhoneNumber({
            ...dataPhoneNumber,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Gọi hàm async và đợi kết quả
        await postPhoneNumber();
    };


    const postPhoneNumber = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/Users', {
                action: "postPhoneNumber",
                value: dataPhoneNumber.phoneNumber
            });

                console.log(response.data); 
        } catch (error) {
            console.error('Post phone number error:', error);
        }
    };

    return (
        <div className='page__forgot--pass'>
            <div className='forgot--pass'>
                <div className='forgot--pass__header'>
                    <Link to={"/Login"} className='header--back'><i className="fa-solid fa-arrow-left"></i></Link>
                    <h1 className='shop__name'>CLICKTOBUY</h1>
                    <Link to={"/"} className='header--back'><i className="fa-solid fa-house"></i></Link>
                </div>
                <div className='forgot--pass__title'>Quên mật khẩu</div>
                <form className='forgot--pass__form'>
                    <label className='label__account'>
                        <input
                            type="text"
                            className='account__input'
                            name='phoneNumber'
                            value={dataPhoneNumber.phoneNumber}
                            onChange={handleChange}
                        />
                        <span className={dataPhoneNumber.phoneNumber.trim().length > 0 ? "account__title1" : "account__title"}>Nhập vào số điện thoại của bạn</span>
                    </label>
                    <button className='forgot--pass__button' type='submit' onClick={handleSubmit}>Tiếp tục</button>
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
