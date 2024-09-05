import { Link, useNavigate } from 'react-router-dom';
import '../Style/Register.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [dataAccount, setDataAccount] = useState([]);
    const [errorInput, setErrorInput] = useState({
        errorCheckPhoneNumber: "",
        errorCheckEmail: "",
        errorCheckPassword: {
            length: "",
            empty: ""
        }
    });
    const [dataAddress, setDataAddress] = useState({
        province: "",
        district: "",
        ward: "",
        addressDetail: "",
    });
    const [dataAccountRegister, setDataAccountRegister] = useState({
        userName: "",
        password: "",
        fullName: "",
        phoneNumber: "",
        address: "", 
        email: ""
    });

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
        let data = sessionStorage.getItem("fullName");
        console.log(data);
    }, []);


    useEffect(() => {
        const fetchDataProvince = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/province');
                setProvinces(response.data.data.data);
            } catch (error) {
                console.error('Error fetching provinces: ', error);
            }
        };

        fetchDataProvince();
    }, []);

    useEffect(() => {
        const fetchDataDistrict = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/districts');
                setDistricts(response.data.data.data);
            } catch (error) {
                console.error('Error fetching districts: ', error);
            }
        };
        fetchDataDistrict();
    }, []);

    useEffect(() => {
        const fetchDataWards = async () => {
            try {
                const response = await axios.get('http://localhost:5002/api/wards');
                setWards(response.data.data.data);
            } catch (error) {
                console.error('Error fetching wards: ', error);
            }
        };
        fetchDataWards();
    }, []);


    const getFullAddressName = (provinceCode, districtCode, wardCode) => {
        const province = provinces.find(element => provinceCode === element.code);
        const district = districts.find(elementDistrict => districtCode === elementDistrict.code);
        const ward = wards.find(elementWard => wardCode === elementWard.code);
    
        return `${ward ? ward.name : ''} -  ${district ? district.name : ''} - ${province ? province.name : ''} `;
    }

    useEffect(() => {
        // Cập nhật địa chỉ đầy đủ mỗi khi dataAddress thay đổi
        const fullAddress = `${dataAddress.addressDetail}, ${getFullAddressName(dataAddress.province,dataAddress.district,dataAddress.ward)}`;
        setDataAccountRegister(prev => ({
            ...prev,
            address: fullAddress
        }));
    }, [dataAddress]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDataAddress(prev => ({
            ...prev,
            [name]: value
        }));
        setDataAccountRegister(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (name === 'phoneNumber') {
            setErrorInput(prev => ({ ...prev, errorCheckPhoneNumber: "" }));
        }
        if (name === 'email') {
            setErrorInput(prev => ({ ...prev, errorCheckEmail: "" }));
        }
        if (name === 'password') {
            setErrorInput(prev => ({
                ...prev,
                errorCheckPassword: {
                    length: "",
                    empty: ""
                }
            }));
        }
        
    };

    const isValidPhoneNumber = (phoneNumber) => {
        const phoneRegex = /^\d{10,11}$/;
        return phoneRegex.test(phoneNumber);
    }

    const isValidGmail = (email) => {
        const gmailRegex = /^[^\s@]+@gmail\.com$/;
        return gmailRegex.test(email);
    }

    const checkLengthPassword = (password) => {
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);
        return hasLetter && hasNumber && hasSpecialChar;
    }

    const checkPhoneNumberExists = async (phoneNumber) => {
        // try {
        //     const response = await axios.get(`http://localhost:8080/api/Users/checkPhoneNumber?phoneNumber=${phoneNumber}`);
        //     return response.data.exists;
        // } catch (error) {
        //     console.error('Error checking phone number:', error);
        //     return false;
        // }
    }
    

    const handleRegister = async (event) => {
        event.preventDefault();
        let hasError = false;
    
        // Phone number
        if (!isValidPhoneNumber(dataAccountRegister.phoneNumber)) {
            setErrorInput(prev => ({
                ...prev,
                errorCheckPhoneNumber: "Số điện thoại chưa đúng"
            }));
            hasError = true;
        }

        if(!checkPhoneNumberExists(dataAccountRegister.phoneNumber)){
            setErrorInput(prev => ({  
                ...prev,
                errorCheckPhoneNumber: "Số điện thoại đã tồn tại"
            }));
            hasError = true;
        }
    
        // Email 
        if (!isValidGmail(dataAccountRegister.email)) {
            setErrorInput(prev => ({
                ...prev,
                errorCheckEmail: "Định dạng email chưa đúng"
            }));
            hasError = true;
        }
    
        // Password 
        if (!checkLengthPassword(dataAccountRegister.password)) {
            setErrorInput(prev => ({
                ...prev,
                errorCheckPassword: {
                    length: "Password phải có đủ chữ cái, số và ký tự đặc biệt",
                    empty: ""
                }
            }));
            hasError = true;
        }
    
        if (hasError) {
            return; 
        } else {
            alert("Bạn đã đăng kí thành công");
            navigate("/Login")
        }
    
        try {
            const response = await axios.post('http://localhost:8080/api/Users', {
                action : "insertRegister",
                value : dataAccountRegister
            });
            console.log('Response:', response.data);
            // Xử lý phản hồi sau khi đăng ký thành công
        } catch (error) {
            console.error('Registration error:', error);
            // Hiển thị thông báo lỗi cho người dùng
        }
    };
    
    const filteredDistricts = districts.filter(itemDistricts => itemDistricts.parent_code === dataAddress.province);
    const filteredWards = wards.filter(itemWards => itemWards.parent_code === dataAddress.district);

    return (
        <div className='page__register'>
            <div className='register'>
                <div className='register__header'>
                    <Link to={"/Login"} className='header--back'><i className="fa-solid fa-arrow-left"></i></Link>
                    <h1 className='shop__name'>CLICKTOBUY</h1>
                    <Link to={"/"} className='header--back'><i className="fa-solid fa-house"></i></Link>
                </div>
                <div className='register__title'>Đăng kí</div>
                <form className='register__form' onSubmit={handleRegister}>
                    <label className='label__account'>
                        <input
                            type="text"
                            className='account__input'
                            name='userName'
                            value={dataAccountRegister.userName}
                            onChange={handleChange}
                        />
                        <span className={dataAccountRegister.userName.length > 0 ? 'account__title1' : 'account__title'}>Tên đăng nhập</span>
                    </label>

                    <label className='label__password'>
                        <input
                            type="password"
                            className='password__input'
                            name='password'
                            value={dataAccountRegister.password}
                            onChange={handleChange}
                        />
                        <span className={dataAccountRegister.password.length > 0 ? 'password__title1' : 'password__title'}>Mật khẩu</span>
                        {errorInput.errorCheckPassword.length && <div className='input__error'>{errorInput.errorCheckPassword.length}</div>}
                    </label>

                    <label className='label__fullname'>
                        <input
                            type="text"
                            className='fullname__input'
                            name='fullName'
                            value={dataAccountRegister.fullName}
                            onChange={handleChange}
                        />
                        <span className={dataAccountRegister.fullName.length > 0 ? 'fullname__title1' : 'fullname__title'}>Họ và tên</span>
                    </label>

                    <label className='label__phonenumber'>
                        <input
                            type="text"
                            className='phonenumber__input'
                            name='phoneNumber'
                            value={dataAccountRegister.phoneNumber}
                            onChange={handleChange}
                        />
                        <span className={dataAccountRegister.phoneNumber.length > 0 ? 'phonenumber__title1' : 'phonenumber__title'}>Số điện thoại</span>
                        {errorInput.errorCheckPhoneNumber && <div className='input__error'>{errorInput.errorCheckPhoneNumber}</div>}
                    </label>

                    <select className='located--form--select' onChange={handleChange} name='province' value={dataAddress.province}>
                        <option value=''>Chọn tỉnh/ thành phố</option>
                        {provinces.map(item => (
                            <option className='located--form--option' key={item._id} value={item.code}>
                                {item.name}
                            </option>
                        ))}
                    </select>

                    <select className='located--form--select' onChange={handleChange} name='district' value={dataAddress.district}>
                        <option value=''>Chọn quận/ huyện</option>
                        {filteredDistricts.map(itemDistricts => (
                            <option key={itemDistricts.id} value={itemDistricts.code}>
                                {itemDistricts.name}
                            </option>
                        ))}
                    </select>

                    <select className='located--form--select' onChange={handleChange} name='ward' value={dataAddress.ward}>
                        <option value=''>Chọn xã/ phường</option>
                        {filteredWards.map(itemWards => (
                            <option key={itemWards.id} value={itemWards.code}>
                                {itemWards.name}
                            </option>
                        ))}
                    </select>

                    <textarea className='located--form--note' placeholder='Ghi chú: số nhà, tên đường' name='addressDetail' value={dataAddress.addressDetail} onChange={handleChange}>
                    </textarea>

                    <label className='label__email'>
                        <input
                            type="email"
                            className='email__input'
                            name='email'
                            value={dataAccountRegister.email}
                            onChange={handleChange}
                        />
                        <span className={dataAccountRegister.email.length > 0 ? 'email__title1' : 'email__title'}>Email</span>
                        {errorInput.errorCheckEmail && <div className='input__error'>{errorInput.errorCheckEmail}</div>}
                    </label>
                    <input className='register__button' type='submit' value="Đăng kí" />
                    <div className='register__other'>
                        <span className='register__other__title'>Hoặc</span>
                    </div>
                    <Link className='register_button' to={'/Login'}>Đăng nhập</Link>
                </form>
            </div>
        </div>
    );
};

export default Register;
