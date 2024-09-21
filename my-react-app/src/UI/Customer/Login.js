import { Link, useNavigate } from 'react-router-dom';
import '../../Style/Login.css';
import { useContext, useState } from 'react';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';

const Login = () => {
    const { login } = useContext(AuthContext);
    const [dataToken, setDataToken] = useState("");
    const [accountLogin, setAccountLogin] = useState({
        user: "",
        password: ""
    });
    const [loginError, setLoginError] = useState("");
    const [userError, setUserError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);  // Trạng thái cho việc gửi form
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAccountLogin({
            ...accountLogin,
            [name]: value
        });
    };

    const checkInputUser = () => {
        if (accountLogin.user.trim().length === 0) {
            setUserError("Thông tin bắt buộc");
            return false;
        }
        setUserError("");
        return true;
    };

    const checkInputPassword = () => {
        if (accountLogin.password.trim().length === 0) {
            setPasswordError("Thông tin bắt buộc");
            return false;
        }
        setPasswordError("");
        return true;
    };

    const getTokenAccount = async () => {
        try {
            const url = 'http://localhost:8080/api/Auth/Login';
            const response = await axios.post(url, {
                username: accountLogin.user,
                password: accountLogin.password
            });
            return response.data.token || "";  // Trả token ra ngoài
        } catch (error) {
            console.error('Error fetching data: ', error);
            setLoginError("Đã xảy ra lỗi khi đăng nhập");
            return "";  // Trả rỗng nếu lỗi
        }
    };

    const handleLogin = async () => {
        if (!checkInputUser() || !checkInputPassword()) {
            return;
        }
        
        if (isSubmitting) return;  // Nếu đang gửi form thì không thực hiện thêm hành động nào nữa

        setIsSubmitting(true);  // Đánh dấu trạng thái đang gửi form

        const token = await getTokenAccount();
        
        if (token) {
            try {
                const [encodeHeader, encodePayload, encodeSignature] = token.split(".");
                const bytes = new Uint8Array([...atob(encodePayload)].map(c => c.charCodeAt(0)));
                const decoder = new TextDecoder('utf-8');
                const decodedPayload = JSON.parse(decoder.decode(bytes));
                const accountInforSession = {
                    id: decodedPayload.id,
                    fullName: decodedPayload.fullName,
                    role: decodedPayload.role
                };
                const userData = { username: accountInforSession.id, role: accountInforSession.role };
                login(userData);
                sessionStorage.setItem("account", JSON.stringify(accountInforSession));
                if (userData.role === "ADMIN") {
                    navigate('/DashBoard')
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error('Error decoding JWT: ', error);
                setLoginError("Token không hợp lệ");
            }
        } else {
            setLoginError("Tên đăng nhập hoặc mật khẩu không đúng");
        }

        setIsSubmitting(false);  // Đặt lại trạng thái khi gửi form xong
    };

    return (
        <div className='page__login'>
            <div className='login'>
                <div className='login__header'>
                    <Link to={"/"} className='header--back'><i className="fa-solid fa-arrow-left"></i></Link>
                    <h1 className='shop__name'>CLICKTOBUY</h1>
                    <Link to={"/"} className='header--back'><i className="fa-solid fa-house"></i></Link>
                </div>
                <div className='login__title'>Đăng nhập</div>
                <form className='login__form' onSubmit={(e) => e.preventDefault()}>
                    <label className='label__account'>
                        <input
                            type="text"
                            className='account__input'
                            name='user'
                            value={accountLogin.user}
                            onChange={handleChange}
                            onBlur={checkInputUser}
                        />
                        <span className={accountLogin.user.length > 0 ? 'account__title1' : 'account__title'}>Tên đăng nhập</span>
                        {userError && <div className='login__error'>{userError}</div>}
                    </label>
                    <label className='label__password'>
                        <input
                            type="password"
                            className='password__input'
                            name='password'
                            value={accountLogin.password}
                            onChange={handleChange}
                            onBlur={checkInputPassword}
                        />
                        <span className={accountLogin.password.length > 0 ? 'password__title1' : 'password__title'}>Mật khẩu</span>
                        {passwordError && <div className='login__error'>{passwordError}</div>}
                    </label>
                    <input
                        className='login__button'
                        type='button'
                        value="Đăng nhập"
                        onClick={handleLogin}
                        disabled={isSubmitting}  // Vô hiệu hóa nút khi đang gửi form
                    />
                    <Link to={"/Forgot-pass"} className='login__forgot_password'>Quên mật khẩu ?</Link>
                    <div className='login__other'>
                        <span className='login__other__title'>Hoặc</span>
                    </div>
                    <Link className='register_button' to={'/Register'}>Đăng kí</Link>
                </form>
                {loginError && <div className='login__error'>{loginError}</div>}
            </div>
        </div>
    );
};

export default Login;
