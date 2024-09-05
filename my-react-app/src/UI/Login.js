import { Link, useNavigate } from 'react-router-dom';
import '../Style/Login.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [dataAccount, setDataAccount] = useState([]);
    const [accountLogin, setAccountLogin] = useState({
        user: "",
        password: ""
    });
    const [loginError, setLoginError] = useState("");
    const [userError, setUserError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAccountLogin({
            ...accountLogin,
            [name]: value
        });
    };

    useEffect(() => {
        const getDataAccount = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/Users');
                setDataAccount(response.data || []);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        getDataAccount();
    }, []);

    const checkLogin = () => {
        if (!checkInputUser() || !checkInputPassword()) {
            return;
        }

        const account = dataAccount.find(account => 
            accountLogin.user === account.userName && 
            accountLogin.password === account.password
        );
        
        if (account) {
            const accountInforSession = {
                id: account.userID,
                fullName: account.fullName
            };
            alert("Đăng nhập thành công");
            sessionStorage.setItem("account", JSON.stringify(accountInforSession));
            navigate('/');
        } else {
            setLoginError("Tên đăng nhập hoặc mật khẩu không đúng");
            alert("Tên đăng nhập hoặc mật khẩu không đúng");
        }
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
                    <input className='login__button' type='button' value="Đăng nhập" onClick={checkLogin} />
                    <Link to={"/Forgot-pass"} className='login__forgot_password'>Quên mật khẩu ?</Link>
                    <div className='login__other'>
                        <span className='login__other__title'>Hoặc</span>
                    </div>
                    <Link className='register_button' to={'/Register'}>Đăng kí</Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
