import { createContext, useEffect, useState } from "react";

const ProductTypeContext = createContext();

export const ProductTypeProvider = ({ children }) => {
    const [type, setType] = useState(() => {
        try {
            const dataType = sessionStorage.getItem("ProductType");
    
            return dataType ? JSON.parse(dataType) : "";
        } catch (error) {
            console.error("Error parsing ProductType from sessionStorage:", error);
            return "";
        }
    });

    useEffect(() => {
        sessionStorage.setItem("ProductType", JSON.stringify(type));
    }, [type]);

    useEffect(() => {
        const checkSesionStorage = () => {
            try {
                const savedType =sessionStorage.getItem("ProductType");
                if (savedType) {
                    const updatedType = JSON.parse(savedType);
                        setType(updatedType);
                }
            } catch (error) {
                console.error("Failed to parse cart from localStorage:", error);
            }
        };

        // Kiểm tra ngay lập tức
        checkSesionStorage();

        // Đặt interval để kiểm tra mỗi 5 giây
        const intervalId = setInterval(checkSesionStorage, 100);

        // Hủy interval khi component unmount
        return () => clearInterval(intervalId);
    }, []);
    return (
        <ProductTypeContext.Provider value={{ type, setType }}>
            {children}
        </ProductTypeContext.Provider>
    );
};

export default ProductTypeContext;
