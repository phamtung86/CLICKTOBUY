import axios from "axios";
import { createContext, useEffect, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [dataProducts, setDataProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading
  const [error, setError] = useState(null); // Thêm trạng thái lỗi

  const fetchDataProductFromInventory = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/api/Inventorys/inventorys`);
      if (Array.isArray(result.data)) {
        setDataProducts(result.data); // Kiểm tra xem dữ liệu có phải là mảng không
      } else {
        console.error("Dữ liệu không hợp lệ:", result.data);
      }
    } catch (error) {
      console.error("Lỗi trong quá trình lấy sản phẩm:", error.message);
      setError(error.message); // Lưu lại thông tin lỗi
    } finally {
      setLoading(false); // Đặt loading thành false sau khi hoàn thành
    }
  };

  useEffect(() => {
    fetchDataProductFromInventory();
  }, []);

  return (
    <ProductContext.Provider value={{ dataProducts, loading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
