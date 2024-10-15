import axios from "axios";
import { createContext, useEffect, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [valueSearch, setValueSearch] = useState(''); // Khởi tạo với chuỗi rỗng
    const [dataResultProductsSearch, setDataResultProductsSearch] = useState([]);

    // Hàm lấy giá trị từ sessionStorage
    const getValueSearchFromSession = () => {
        try {
            const storedValueSearch = sessionStorage.getItem('valueSearch');
            console.log(storedValueSearch);
            return storedValueSearch || ''; // Trả về chuỗi rỗng nếu không có giá trị trong sessionStorage
        } catch (error) {
            console.error("Lỗi khi lấy giá trị từ sessionStorage:", error);
            return '';
        }
    };

    // Lấy dữ liệu từ sessionStorage và cập nhật valueSearch khi component được mount
    useEffect(() => {
        const initialSearchValue = getValueSearchFromSession();
        setValueSearch(initialSearchValue);
    }, [valueSearch]);

    // Tìm kiếm sản phẩm khi giá trị tìm kiếm thay đổi
    useEffect(() => {
        if (valueSearch) {
            console.log(valueSearch);
            const getDataSearch = async () => {
                try {
                    const url = `http://localhost:8080/api/Products/getDataProductsSearch?productName=${valueSearch}`;
                    const response = await axios.post(url);
                    setDataResultProductsSearch(response.data);
                } catch (error) {
                    console.error("Lỗi khi gọi API tìm kiếm sản phẩm:", error);
                }
            }; 
            getDataSearch();
        } else {
            // Nếu không có giá trị tìm kiếm, xóa kết quả tìm kiếm
            setDataResultProductsSearch([]);
        }
    }, [valueSearch]);

    // Hàm xử lý khi giá trị input thay đổi
    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setValueSearch(newValue);
        sessionStorage.setItem('valueSearch', newValue); // Lưu vào sessionStorage
    };

    return (
        <SearchContext.Provider value={{ valueSearch, dataResultProductsSearch, handleInputChange }}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchContext;
