import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        try {
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error("Failed to parse cart from localStorage:", error);
            return [];
        }
    });

    // Cập nhật localStorage khi cart thay đổi
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Hàm cập nhật dữ liệu từ localStorage định kỳ
    useEffect(() => {
        const checkLocalStorage = () => {
            try {
                const savedCart = localStorage.getItem("cart");
                if (savedCart) {
                    const updatedCart = JSON.parse(savedCart);
                    if (Array.isArray(updatedCart)) {
                        setCart(updatedCart);
                    }
                }
            } catch (error) {
                console.error("Failed to parse cart from localStorage:", error);
            }
        };

        // Kiểm tra ngay lập tức
        checkLocalStorage();

        // Đặt interval để kiểm tra mỗi 5 giây
        const intervalId = setInterval(checkLocalStorage, 5000);

        // Hủy interval khi component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
