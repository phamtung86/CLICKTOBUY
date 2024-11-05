package Backend.BusinessLayer;

import Backend.DataLayer.IOrderReponsitory;
import Backend.DataLayer.OrderReponsitoryimpl;
import Entity.Order;
import Entity.Users;
import Entity.Vouchers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class OrderServicesimpl implements IOrderServices {
    public IOrderReponsitory iOrderReponsitory;

    public OrderServicesimpl() {
        iOrderReponsitory = new OrderReponsitoryimpl();
    }

    @Override
    public boolean insertOrder(Order order, Integer userID, Integer voucherID) {
        return iOrderReponsitory.insertOrder(order, userID, voucherID);
    }

    @Override
    public double getTotalRevenueMonth(int month) {
        return iOrderReponsitory.getTotalRevenueMonth(month);
    }

    @Override
    public int getLastOrderID() {
        return iOrderReponsitory.getLastOrderID();
    }

    @Override
    public ArrayList<Order> getListTopUserOrders(String type) {
        return iOrderReponsitory.getListTopUserOrders(type);
    }

    @Override
    public double getTotalRevenue(String type) {
        String SELECT_REVALUE = "";
        switch (type) {
            case "DAY":
                SELECT_REVALUE = "SELECT SUM(TotalAmount) FROM orders WHERE DAY(OrderDate) = DAY(CURRENT_DATE) AND MONTH(OrderDate) = MONTH(CURRENT_DATE)  ";
                break;
            case "MONTH":
                SELECT_REVALUE = "SELECT SUM(TotalAmount) FROM orders WHERE MONTH(OrderDate) = MONTH(CURRENT_DATE) AND YEAR(OrderDate) = YEAR(CURRENT_DATE) ";
                break;
            case "YEAR":
                SELECT_REVALUE = "SELECT SUM(TotalAmount) FROM orders WHERE YEAR(OrderDate) = YEAR(CURRENT_DATE) ";
                break;
            default:
                SELECT_REVALUE = "SELECT SUM(TotalAmount) FROM orders WHERE DAY(OrderDate) = DAY(CURRENT_DATE) AND MONTH(OrderDate) = MONTH(CURRENT_DATE)";
                break;
        }
        return iOrderReponsitory.getTotalRevenue(type,SELECT_REVALUE);
    }

    @Override
    public List<Order> listOrderByStatus(String status, String type) {
        IUserServices iUserServices = new UserServicesimpl();
        IVoucherServices iVoucherServices = new VoucherServicesimpl();
        Map<Integer, Users> mapUsers = iUserServices.getMapUsers();
        Map<Integer, Vouchers> mapVouchers = iVoucherServices.mapVoucherByVoucherID();
        String GET_ORDER_BY_STATUS_TYPE;
        if (status.equals("PENDING")) {
            switch (type) {
                case "DAY":
                    GET_ORDER_BY_STATUS_TYPE = "SELECT * FROM orders WHERE status = ? AND DAY(OrderDate) = DAY(CURRENT_DATE) AND MONTH(OrderDate) = MONTH(CURRENT_DATE) ORDER BY OrderDate DESC ";
                    break;
                case "MONTH":
                    GET_ORDER_BY_STATUS_TYPE = "SELECT * FROM orders WHERE status = ? AND MONTH(OrderDate) = MONTH(CURRENT_DATE) AND YEAR(OrderDate) = YEAR (CURRENT_DATE) ORDER BY OrderDate DESC";
                    break;
                case "YEAR":
                    GET_ORDER_BY_STATUS_TYPE = "SELECT * FROM orders WHERE status = ? AND YEAR(OrderDate) = YEAR(CURRENT_DATE) ORDER BY OrderDate DESC";
                    break;
                default:
                    GET_ORDER_BY_STATUS_TYPE = "SELECT * FROM orders WHERE status = ? AND DAY(OrderDate) = DAY(CURRENT_DATE) AND MONTH(OrderDate) = MONTH(CURRENT_DATE) ORDER BY OrderDate DESC ";
                    break;
            }
        } else {
            switch (type) {

                case "DAY":
                    GET_ORDER_BY_STATUS_TYPE = "SELECT * FROM orders WHERE status = ? AND DATE(StatusDate) = CURRENT_DATE ORDER BY StatusDate DESC ";
                    break;
                case "MONTH":
                    GET_ORDER_BY_STATUS_TYPE = "SELECT * FROM orders WHERE status = ? AND MONTH(StatusDate) = MONTH(CURRENT_DATE) AND YEAR(StatusDate) = YEAR (CURRENT_DATE) ORDER BY OrderDate DESC";
                    break;
                case "YEAR":
                    GET_ORDER_BY_STATUS_TYPE = "SELECT * FROM orders WHERE status = ? AND YEAR(StatusDate) = YEAR(CURRENT_DATE) ORDER BY StatusDate DESC";
                    break;
                default:
                    GET_ORDER_BY_STATUS_TYPE = "SELECT SUM(TotalAmount) FROM orders WHERE DAY(StatusDate) = DAY(CURRENT_DATE) ";
                    break;
            }
        }
        return iOrderReponsitory.listOrderByStatus(GET_ORDER_BY_STATUS_TYPE,status, type, mapUsers, mapVouchers);
    }

    @Override
    public boolean updateStatusOrder(String status, int OrderID) {
        return iOrderReponsitory.updateStatusOrder(status, OrderID);
    }

    @Override
    public Map<Integer, Order> getMapOrders() {
        IUserServices iUserServices = new UserServicesimpl();
        IVoucherServices iVoucherServices = new VoucherServicesimpl();
        Map<Integer,Users> mapUsers = iUserServices.getMapUsers();
        Map<Integer,Vouchers> mapVouchers = iVoucherServices.mapVoucherByVoucherID();
        return iOrderReponsitory.getMapOrders(mapUsers,mapVouchers);
    }

}
