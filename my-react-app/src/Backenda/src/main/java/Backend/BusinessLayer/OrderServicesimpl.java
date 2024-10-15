package Backend.BusinessLayer;

import Backend.DataLayer.IOrderReponsitory;
import Backend.DataLayer.OrderReponsitoryimpl;
import Entity.Order;

import java.util.ArrayList;

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
        return iOrderReponsitory.getTotalRevenue(type);
    }

}
