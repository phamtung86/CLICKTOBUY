package Backend.BusinessLayer;

import Entity.Order;
import Entity.Users;
import Entity.Vouchers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface IOrderServices {
    public boolean insertOrder(Order order, Integer userID, Integer voucherID);

    public double getTotalRevenueMonth(int month);

    public int getLastOrderID();

    public ArrayList<Order> getListTopUserOrders(String type);

    public double getTotalRevenue(String type);

    public List<Order> listOrderByStatus(String status, String type);

    public boolean updateStatusOrder(String status,int OrderID);

    public Map<Integer, Order> getMapOrders();
}
