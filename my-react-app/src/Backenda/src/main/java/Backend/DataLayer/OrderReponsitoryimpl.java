package Backend.DataLayer;

import Backend.BusinessLayer.IUserServices;
import Backend.BusinessLayer.IVoucherServices;
import Backend.BusinessLayer.UserServicesimpl;
import Backend.BusinessLayer.VoucherServicesimpl;
import Entity.Users;
import Entity.Vouchers;
import Ultils.JdbcConnection;
import Entity.Order;
import org.eclipse.jetty.server.Authentication;

import java.sql.*;
import java.util.*;
import java.util.Date;

public class OrderReponsitoryimpl implements IOrderReponsitory {


    @Override
    public boolean insertOrder(Order order, Integer userID, Integer voucherID) {
        String INSERT_ORDER = "INSERT INTO Orders (OrderID,TotalAmount, totalFee,UserID,VoucherID) VALUES(?,?,?,?,?)";
        try (Connection conn = JdbcConnection.getConnection(); PreparedStatement ps = conn.prepareStatement(INSERT_ORDER)) {
            ps.setInt(1, getLastOrderID() + 1);
            ps.setDouble(2, order.getTotalAmount());
            ps.setDouble(3, order.getTotalFee());
            if (userID != null) {
                ps.setInt(4, userID);
            } else {
                ps.setNull(4, Types.INTEGER);
            }
            if (voucherID != null) {
                ps.setInt(5, voucherID);
            } else {
                ps.setNull(5, Types.INTEGER);
            }
            int count = ps.executeUpdate();
            if (count > 0) {
                return true;
            }
            JdbcConnection.closeConnection(conn, ps, null);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public double getTotalRevenueMonth(int month) {
        String SELECT_REVALUE_MONTH = "SELECT SUM(TotalAmount) FROM book.orders WHERE MONTH(OrderDate) = ? ";
        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            connection = JdbcConnection.getConnection();
            ps = connection.prepareStatement(SELECT_REVALUE_MONTH);
            ps.setInt(1, month);
            rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getDouble(1);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }finally {
            JdbcConnection.closeConnection(connection,ps,rs);
        }
        return -1;
    }

    @Override
    public int getLastOrderID() {
        String SELECT_LAST_ORDER_ID = "SELECT OrderID FROM orders ORDER BY OrderID DESC LIMIT 1";
        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            connection = JdbcConnection.getConnection();
            ps = connection.prepareStatement(SELECT_LAST_ORDER_ID);
            rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getInt(1);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }finally {
            JdbcConnection.closeConnection(connection,ps,rs);
        }
        return -1;
    }

    @Override
    public ArrayList<Order> getListTopUserOrders(String type) {
        IUserServices iUserServices = new UserServicesimpl();
        Map<Integer, Users> mapUsers = iUserServices.getMapUsers();
        ArrayList<Order> listOrders = new ArrayList<>();

        // Tạo câu truy vấn động dựa trên loại thời gian
        String GET_TOP_USER_BUY;
        switch (type) {
            case "DAY":
                GET_TOP_USER_BUY = "SELECT UserID, SUM(totalAmount) FROM orders WHERE DATE(OrderDate) = CURRENT_DATE GROUP BY UserID ORDER BY SUM(totalAmount) DESC LIMIT 10";
                break;
            case "MONTH":
                GET_TOP_USER_BUY = "SELECT UserID, SUM(totalAmount) FROM orders WHERE MONTH(OrderDate) = MONTH(CURRENT_DATE) AND YEAR(OrderDate) = YEAR(CURRENT_DATE) GROUP BY UserID ORDER BY SUM(totalAmount) DESC LIMIT 10";
                break;
            case "YEAR":
                GET_TOP_USER_BUY = "SELECT UserID, SUM(totalAmount) FROM orders WHERE YEAR(OrderDate) = YEAR(CURRENT_DATE) GROUP BY UserID ORDER BY SUM(totalAmount) DESC LIMIT 10";
                break;
            default:
                GET_TOP_USER_BUY = "SELECT UserID, SUM(totalAmount) FROM orders WHERE DATE(OrderDate) = CURRENT_DATE GROUP BY UserID ORDER BY SUM(totalAmount) DESC LIMIT 10";
        }

        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            connection = JdbcConnection.getConnection();
            ps = connection.prepareStatement(GET_TOP_USER_BUY);
            rs = ps.executeQuery();
            while (rs.next()) {
                int userID = rs.getInt(1);
                double totalAmount = rs.getDouble(2);
                Timestamp orderDate = new Timestamp(System.currentTimeMillis());
                Order order = new Order(0, orderDate, "", totalAmount, 0, orderDate, mapUsers.get(userID), null);
                listOrders.add(order);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JdbcConnection.closeConnection(connection, ps, rs);
        }
        return listOrders;
    }


    @Override
    public double getTotalRevenue(String type, String sql) {

        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            connection = JdbcConnection.getConnection();
            ps = connection.prepareStatement(sql);
            rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getDouble(1);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JdbcConnection.closeConnection(connection, ps, rs);
        }
        return -1;
    }

    @Override
    public List<Order> listOrderByStatus(String sql,String status, String type,Map<Integer, Users> mapUsers, Map<Integer,Vouchers> mapVouchers) {
        IVoucherServices iVoucherServices = new VoucherServicesimpl();
        List<Order> listOrders = new ArrayList<>();

        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            connection = JdbcConnection.getConnection();
            ps = connection.prepareStatement(sql);
            ps.setString(1, status);
            rs = ps.executeQuery();
            while (rs.next()) {
                int orderID = rs.getInt("OrderID");
                Timestamp orderDate = rs.getTimestamp("OrderDate");
                String orderStatus = rs.getString("Status");
                double totalAmount = rs.getDouble("TotalAmount");
                double totalFee = rs.getDouble("totalFee");
                Timestamp statusDate = rs.getTimestamp("StatusDate");
                Users user = mapUsers.get(rs.getInt("UserID"));
                Vouchers vouchers = mapVouchers.get(rs.getInt("VoucherID"));
                Order order = new Order(orderID, orderDate, orderStatus, totalAmount, totalFee, statusDate, user, vouchers);
                listOrders.add(order);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JdbcConnection.closeConnection(connection,ps,rs);
        }
        return listOrders;
    }

    @Override
    public boolean updateStatusOrder(String status, int OrderID) {
        String UPDATE_STATUS_ORDER = "UPDATE orders SET Status = ?, StatusDate = current_timestamp() WHERE OrderID = ?";
        Connection connection = null;
        PreparedStatement ps = null;
        try {
            connection = JdbcConnection.getConnection();
            ps = connection.prepareStatement(UPDATE_STATUS_ORDER);
            ps.setString(1, status);
            ps.setInt(2, OrderID);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JdbcConnection.closeConnection(connection, ps, null);
        }
    }

    @Override
    public Map<Integer, Order> getMapOrders(Map<Integer,Users> mapUsers,Map<Integer, Vouchers> mapVouchers) {
        Map<Integer, Order> mapOrders = new HashMap<>();
        String GET_MAP_ORDERS = "SELECT * FROM orders";
        Connection connection = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            connection = JdbcConnection.getConnection();
            ps = connection.prepareStatement(GET_MAP_ORDERS);
            rs = ps.executeQuery();
            while (rs.next()) {
                int orderID = rs.getInt("OrderID");
                Timestamp orderDate = rs.getTimestamp("OrderDate");
                String orderStatus = rs.getString("Status");
                double totalAmount = rs.getDouble("TotalAmount");
                double totalFee = rs.getDouble("totalFee");
                Timestamp statusDate = rs.getTimestamp("StatusDate");
                Users user = mapUsers.get(rs.getInt("UserID"));
                Vouchers voucher = mapVouchers.get(rs.getInt("VoucherID"));
                Order order = new Order(orderID, orderDate, orderStatus, totalAmount, totalFee, statusDate, user, voucher);
                mapOrders.put(orderID, order);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return mapOrders;
    }
}
