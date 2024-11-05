import React, { useEffect, useState } from 'react';
import '../../../Style/Admin/Order/OrderDetail.css';
import axios from 'axios';

const OrderDetail = ({ dataInforOrderDetail, onChangeStatusDisplayOrderDetail, loadDataOrderStatusType }) => {
    const [dataOrderDetail, setDataOrderDetail] = useState([]);
    const [dataImportInvenrtory, setDataImportInventory] = useState([]);
    const [dataExportInventory, setDataExportInventory] = useState({
        dataOrder : dataInforOrderDetail,
        dataProduct : ''
    })

    // Hàm lấy chi tiết đơn hàng theo ID
    const fetchDataOrderDetailByID = async (orderID) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/OrdersDetail/ListOrderDetailByID?orderDetailID=${orderID}`);
            setDataOrderDetail(response.data);
            setDataImportInventory(response.data);
            setDataExportInventory({
                ...dataExportInventory,
                dataProduct : response.data
            })
        } catch (error) {
            console.error("Lỗi trong quá trình lấy chi tiết đơn hàng:", error);
            alert("Không thể lấy chi tiết đơn hàng, vui lòng thử lại sau!");
        }
    };

    // Ham update quantity vao table Inventory
    const handleUpdateQuantityProduct = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/Inventorys/inventorys?type=${"EXPORT"}`,dataImportInvenrtory);
            if(response.data === false) {
                return
            }
        } catch (error) {
            console.log("Lỗi trong quá trình update số lượng sản phẩm");
            return;
        }
    }

    // ham insert data vao table exportinventory
    const handleInsertInToExportInventory = async () => {
        try {
            console.log(dataOrderDetail);
                 
            const respone = await axios.post(`http://localhost:8080/api/ExportInventories/ExportInventory`,dataExportInventory );
            console.log(respone.data);
            
        } catch (error) {
            console.log("Lỗi xảy ra trong quá trình thêm data vào bảng xuất hàng");
            
        }
    }

    // Gọi API khi component được render lần đầu tiên hoặc khi dataInforOrderDetail thay đổi
    useEffect(() => {
        if (dataInforOrderDetail?.order?.orderID) {
            fetchDataOrderDetailByID(dataInforOrderDetail.order.orderID);
        }
    }, [dataInforOrderDetail]);

    // Hàm đóng chi tiết đơn hàng
    const closeOrderDetail = () => {
        if (onChangeStatusDisplayOrderDetail) {
            onChangeStatusDisplayOrderDetail(0);
        } else {
            console.warn('onChangeStatusDisplayOrderDetail không được truyền vào hoặc không phải là một hàm');
        }
    };

    // Hàm cập nhật trạng thái đơn hàng
    const updateStatusOrder = async (status, orderID) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/Orders/UpdateStatusOrder?status=${status}&orderID=${orderID}`);
            if (response.status === 200) {
                alert("Đã cập nhật trạng thái đơn hàng thành công!");
            } else {
                alert("Cập nhật trạng thái đơn hàng không thành công, vui lòng thử lại.");
            }
        } catch (error) {
            console.error("Lỗi trong quá trình cập nhật trạng thái đơn hàng:", error);
            alert("Không thể cập nhật trạng thái đơn hàng, vui lòng thử lại sau!");
        }
    };

    return (
        <div className="order__detail">
            <div className='order__detail--name--logo'>
                <img className='order__detail--logo' src='https://res.cloudinary.com/dspqk9rl9/image/upload/v1728637345/saqc7yd4cjj7kof9zazd.webp' alt='Logo' />
                <h1 className='order__detail--name'>CLICKTOBUY</h1>
                <div></div>
            </div>
            <h1 className='order__detail--title'>Chi tiết đơn hàng</h1>
            <div className='order__detail__infor__customer'>
                <div className='order__detail__infor--order'>
                    <div className='order__detail__infor--title--value'>Mã đơn hàng: {dataInforOrderDetail?.order?.orderID}</div>
                    <div className='order__detail__infor--title--value'>
                        Ngày đặt: {new Date(dataInforOrderDetail?.order?.orderDate).toLocaleDateString('vi-VN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}, {new Date(dataInforOrderDetail?.order?.orderDate).toLocaleTimeString('vi-VN', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: true,
                        })}
                    </div>
                </div>
                <div className='order__detail__infor--customer--box'>
                    <div className='order__detail__infor--customer'>
                        <span className='order__detail__infor--title'>Mã khách hàng:</span>
                        <div className='order__detail__infor--value'>{dataInforOrderDetail?.order?.users?.userID}</div>
                    </div>
                    <div className='order__detail__infor--customer'>
                        <div className='order__detail__infor--title'>Tên khách hàng</div>
                        <div className='order__detail__infor--value'>{dataInforOrderDetail?.order?.users?.fullName}</div>
                    </div>
                    <div className='order__detail__infor--customer'>
                        <div className='order__detail__infor--title'>Số điện thoại</div>
                        <div className='order__detail__infor--value'>{dataInforOrderDetail?.order?.users?.phoneNumber}</div>
                    </div>
                    <div className='order__detail__infor--customer'>
                        <div className='order__detail__infor--title'>Địa chỉ</div>
                        <div className='order__detail__infor--value'>{dataInforOrderDetail?.order?.users?.address.startsWith(',') ? dataInforOrderDetail?.order?.users?.address.substring(1) : dataInforOrderDetail?.order?.users?.address
                        }</div>
                    </div>
                    <div className='order__detail__infor--customer'>
                        <div className='order__detail__infor--title'>Email</div>
                        <div className='order__detail__infor--value'>{dataInforOrderDetail?.order?.users?.email}</div>
                    </div>
                </div>
            </div>
            <div className='order__detail--product'>
                <div className='order__detail--product--title'>Danh sách sản phẩm</div>
                <div className='order__detail--product--table--data'>
                    {dataOrderDetail.map(item => (
                        <div className='order__detail--product--table--data--item' key={item.product.productId}>
                            <div className='product--table--data'>{item.product.productId}</div>
                            <div className='product--table--data'><img className='product--table--data--image' src={item.product.productImageLink} alt='Product' /></div>
                            <div className='product--table--data'>{item.product.productName}</div>
                            <div className='product--table--data'>
                                {item.product.productDiscount ? 
                                    (item.product.productPrice - ((item.product.productDiscount / 100) * item.product.productPrice)).toLocaleString('en-US', { maximumFractionDigits: 3 })
                                    : item.product.productPrice.toLocaleString('en-US', { maximumFractionDigits: 3 })} ₫
                            </div>
                            <div className='product--table--data'>{item.product.productUnit}</div>
                            <div className='product--table--data'>x{item.quantity}</div>
                            <div className='product--table--data'>{item.product.productNote}</div>
                        </div>
                    ))}
                </div>
                <div className='order__detail--total'>
                    <div className='total__price'>Phí: {dataInforOrderDetail?.order?.totalFee?.toLocaleString('en-US', { maximumFractionDigits: 3 })} ₫</div>
                    <div className='total__price'>Tổng tiền: {dataInforOrderDetail?.order?.TotalAmount?.toLocaleString('en-US', { maximumFractionDigits: 3 })} ₫</div>
                </div>
            </div>
            <div className='order__detail--button'>
                <button className='order__detail--button--action order__detail--button--close' onClick={closeOrderDetail}>Đóng</button>
                {dataInforOrderDetail?.order?.status === "PENDING" && (
                    <button
                        className='order__detail--button--action order__detail--button--confirm'
                        onClick={async () => {
                            await updateStatusOrder("CONFIRMED", dataInforOrderDetail.order.orderID);
                            handleUpdateQuantityProduct();
                            handleInsertInToExportInventory();
                            closeOrderDetail();
                            loadDataOrderStatusType("PENDING", "MONTH");
                        }}
                    >
                        Xác nhận đơn
                    </button>
                )}
                {dataInforOrderDetail?.order?.status === "CONFIRMED" && (
                    <button
                        className='order__detail--button--action order__detail--button--confirm'
                        onClick={async () => {
                            await updateStatusOrder("COMPLETED", dataInforOrderDetail.order.orderID);
                            closeOrderDetail();
                            loadDataOrderStatusType("CONFIRMED", "MONTH");
                        }}
                    >
                        Đã giao
                    </button>
                )}
                {dataInforOrderDetail?.order?.status === "PENDING"  && (
                    <button className='order__detail--button--action order__detail--button--cancel'
                        onClick={async () => {
                           if(window.confirm("Bạn có muốn hủy đơn này không ?")){
                            await updateStatusOrder("CANCELLED", dataInforOrderDetail.order.orderID);
                            closeOrderDetail();
                            loadDataOrderStatusType("PENDING", "MONTH");
                           }
                        }}
                    >Hủy đơn</button>

                )}
            </div>
        </div>
    );
};

export default OrderDetail;
