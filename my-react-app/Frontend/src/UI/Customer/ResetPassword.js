import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import '../../Style/Customer/ResetPassword.css'
const ResetPassword = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassWord] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorInput, setErrorInput] = useState({
        errorUsername: "",
        errorCheckPassword: {
            length: "",
            empty: ""
        },
        errorConfirm : ""
    });
    const checkUserName = (userName) => {
        return userName.trim().length;
    }

    const checkLengthPassword = (password) => {
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);
        return hasLetter && hasNumber && hasSpecialChar;
    }

    const checkConfirmPassword = (confirmPassword,password) => {
        return confirmPassword === password;
    }
    const handleUpdate = async (event) => {
        event.preventDefault();
        let hasError = false;

        // Username 
        if (checkUserName(userName) <= 8) {
            setErrorInput(pre => ({
                ...pre,
                errorUsername: "Độ dài tên đăng nhập phải lớn hơn 8 kí tự"
            }))
            hasError = true;
        }

        // Password 
        if (!checkLengthPassword(password)) {
            setErrorInput(prev => ({
                ...prev,
                errorCheckPassword: {
                    length: "Password phải có đủ chữ cái, số và ký tự đặc biệt",
                    empty: ""
                }
            }));
            hasError = true;
        }
        if(!checkConfirmPassword(confirmPassword,password)){
            setErrorInput(prev => ({
                ...prev,
                errorConfirm : "Mẩu khẩu không đúng"
            }))
            hasError = true;
        }
        if (hasError) {
            return;
        } else {
            try {
                const response = await axios.put(`http://localhost:8080/api/Users/UpdatePassword?username=${userName}&password=${password}`)
                if (response.status === 200) {
                    alert("Mật khẩu đã được thay đổi")
                    navigate('/Login')
                }
            } catch (error) {
                console.error('Lỗi', error);
            }
        }
    };
    return (
        <div className='page__password'>
            <div className='password'>
                <div className='register__header'>
                    <Link to={"/Forgot-pass"} className='header--back'><i className="fa-solid fa-arrow-left"></i></Link>
                    <h1 className='shop__name'>CLICKTOBUY</h1>
                    <Link to={"/"} className='header--back'><i className="fa-solid fa-house"></i></Link>
                </div>
                <div className='register__title'>Đặt lại mật khẩu</div>
                <form className='register__form' onSubmit={handleUpdate}>
                <label className='label__account'>
                        <input
                            type="text"
                            className='account__input'
                            name='userName'
                            value={userName}
                            onChange={(e) => {setUserName(e.target.value)}}
                        />
                        <span className={userName.length > 0 ? 'account__title1' : 'account__title'}>Tên đăng nhập</span>
                        {errorInput.errorUsername && <div className='input__error'>{errorInput.errorUsername}</div>}
                    </label>
                    <label className='label__password'>
                        <input
                            type="password"
                            className='password__input'
                            name='password'
                            value={password}
                            onChange={(e) => {setPassWord(e.target.value)}}
                        />
                        <span className={password.length > 0 ? 'password__title1' : 'password__title'}>Mật khẩu</span>
                        {errorInput.errorCheckPassword.length && <div className='input__error'>{errorInput.errorCheckPassword}</div>}
                    </label>       
                    <label className='label__password'>
                        <input
                            type="password"
                            className='password__input'
                            name='password'
                            value={confirmPassword}
                            onChange={(e) => {setConfirmPassword(e.target.value)}}
                        />
                        <span className={confirmPassword.length > 0 ? 'password__title1' : 'password__title'}>Nhập lại mật khẩu</span>
                        {errorInput.errorConfirm && <div className='input__error'>{errorInput.errorConfirm}</div>}
                    </label>       
                    <input className='register__button' type='submit' value="Xác nhận" />
                </form>
            </div>
        </div>
    )
}
export default ResetPassword