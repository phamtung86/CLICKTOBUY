// LocatedNew.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';

const LocatedNew = () => {
    const [change, setChange] = useState(0);
    const [province, setProvince] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    useEffect(() => {
        const fetchDataProvince = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/province');
                setProvince(response.data.data.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };

        fetchDataProvince();
    }, []);
    useEffect(() => {
        const fetchDataDistrict = async () => {
            try {
                const responseDistricts = await axios.get('http://localhost:5001/api/districts');
                setDistricts(responseDistricts.data.data.data);

            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        };
        fetchDataDistrict();
    }, [])

    useEffect(() => {
        const fetchDataWards = async () => {
            try {
                const responseWards = await axios.get('http://localhost:5002/api/wards');
                setWards(responseWards.data.data.data);
            } catch (error) {
                console.error('Error fetching data: ', error)
            }
        }
        fetchDataWards();
    },[])
    const [dataLocated, setDataLocated] = useState({
        dataProvice: "",
        dataDistrict: "",
        dataWard: "",
        dataNote: ""
    }
    )
    const changeClass = () => {
        setChange(c => c + 1);
    };

    const renderDataLocated = () => {      
        const filteredDistricts = districts.filter(itemDistricts => itemDistricts.parent_code === dataLocated.dataProvice);
        const filteredWards = wards.filter(itemWards => itemWards.parent_code === dataLocated.dataDistrict);
        return (
            <form className='located--select--form'>
                <select className='located--form--select' onChange={handleChange} name='dataProvice'>
                <option value=''>Chọn tỉnh/ thành phố</option>
                    {province.map(item => (          
                        <option className='located--form--option' key={item._id} value={item.code} >
                            {item.name}
                        </option>
                    ))}
                </select>
                <select className='located--form--select' onChange={handleChange} name='dataDistrict'>
                <option value=''>Chọn quận/ huyện</option>
                {filteredDistricts.map(itemDistricts => (
                  <option key={itemDistricts.id} value={itemDistricts.code}>
                    {itemDistricts.name}
                  </option>
                ))}
              </select>
              <select className='located--form--select' onChange={handleChange} name='dataWard'>
              <option value=''>Chọn xã/ phường</option>
                {filteredWards.map(itemWards => (
                    <option key={itemWards.id} value={itemWards.code}>
                    {itemWards.name}
                    </option>
                ))}
              </select>
              <textarea className='located--form--note' placeholder='Ghi chú: số nhà, tên đường' name='dataNote' onChange={handleChange}>
              </textarea>
            </form>
        )
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDataLocated({
            ...dataLocated,
            [name]: value
        });
    };

    return (
        <>
            {change % 2 === 0 && (
                <div className="located--select">
                    <h3 className='located--select--title'>Vui lòng chọn địa chỉ của bạn</h3>
                    {renderDataLocated()}
                    <div className="click--select">
                        <input className="submit" type="submit" value="Xác nhận"  onClick={handleChange} name='value'/>
                        <button className="cancel" type="button" onClick={changeClass}>
                            Thoát
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default LocatedNew;
