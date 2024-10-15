package Backend.DataLayer;

import Entity.Order;

import java.util.ArrayList;

public interface IOrderReponsitory {
    public boolean insertOrder(Order order, Integer userID, Integer voucherID);

    public double getTotalRevenueMonth(int month);

    public int getLastOrderID();

    public ArrayList<Order> getListTopUserOrders(String type);

    public double getTotalRevenue(String type);
}
