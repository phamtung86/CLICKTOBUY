package Backend.DataLayer;

import Entity.Order;
import Entity.Users;
import Entity.Vouchers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface IOrderReponsitory {
    public boolean insertOrder(Order order, Integer userID, Integer voucherID);

    public double getTotalRevenueMonth(int month);

    public int getLastOrderID();

    public ArrayList<Order> getListTopUserOrders(String type);

    public double getTotalRevenue(String type, String sql);

    public List<Order> listOrderByStatus(String sql,String status, String type,Map<Integer, Users> mapUsers, Map<Integer,Vouchers> mapVouchers);

    public boolean updateStatusOrder(String status,int OrderID);

    public Map<Integer,Order> getMapOrders (Map<Integer,Users> mapUsers,Map<Integer, Vouchers> mapVouchers);
}
