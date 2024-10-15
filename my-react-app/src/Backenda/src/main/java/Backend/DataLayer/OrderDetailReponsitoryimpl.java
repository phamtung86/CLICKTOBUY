package Backend.DataLayer;

import Backend.BusinessLayer.IProductServices;
import Backend.BusinessLayer.ProductServicesimpl;
import Entity.OrderDetail;
import Entity.Products;
import Ultils.JdbcConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class OrderDetailReponsitoryimpl implements IOrderDetailReponsitory {
    @Override
    public boolean insertOrderDetail(double price, int quantity, int productID, int orderID) {
        String INSERT_ORDER_DETAIL = "INSERT INTO oder_detail (price,quantity, OrderID, ProductID) VALUES (?,?,?,?)";
        Connection conn = null;
        PreparedStatement pstmt = null;
        try {
            conn = JdbcConnection.getConnection();
            pstmt = conn.prepareStatement(INSERT_ORDER_DETAIL);
            pstmt.setDouble(1, price);
            pstmt.setInt(2, quantity);
            pstmt.setInt(3, orderID);
            pstmt.setInt(4, productID);
            return pstmt.executeUpdate() > 0;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JdbcConnection.closeConnection(conn, pstmt, null);
        }
    }

    @Override
    public ArrayList<OrderDetail> getTopSellingProducts(String type) {
        IProductServices iProductServices = new ProductServicesimpl();
        Map<Integer, Products> productsMap = iProductServices.getProductsMap();
        ArrayList<OrderDetail> listOrderDetails = new ArrayList<>();
        String SELECT_TOP_SELLING = "";
        switch (type) {
            case "DAY":
                SELECT_TOP_SELLING = "SELECT id, productID, price, SUM(quantity) AS totalQuantity FROM oder_detail od INNER JOIN orders o ON od.OrderID = o.OrderID WHERE DAY(o.OrderDate) = DAY(CURRENT_DATE) GROUP BY productID,id,price ORDER BY totalQuantity DESC LIMIT 10" ;
                break;
            case "MONTH":
                SELECT_TOP_SELLING = "SELECT id, productID, price, SUM(quantity) AS totalQuantity FROM oder_detail od INNER JOIN orders o ON od.OrderID = o.OrderID WHERE MONTH(o.OrderDate) = MONTH(CURRENT_DATE) GROUP BY productID,id,price ORDER BY totalQuantity DESC LIMIT 10";
                break;
            case "YEAR":
                SELECT_TOP_SELLING = "SELECT id, productID, price, SUM(quantity) AS totalQuantity FROM oder_detail od INNER JOIN orders o ON od.OrderID = o.OrderID WHERE YEAR(o.OrderDate) = YEAR(CURRENT_DATE) GROUP BY productID,id,price ORDER BY totalQuantity DESC LIMIT 10";
                break;
            default:
                SELECT_TOP_SELLING = "SELECT id, productID, price, SUM(quantity) AS totalQuantity FROM oder_detail od INNER JOIN orders o ON od.OrderID = o.OrderID WHERE DAY(o.OrderDate) = DAY(CURRENT_DATE) GROUP BY productID,id,price ORDER BY totalQuantity DESC LIMIT 10";
                break;
        }
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try {
            conn = JdbcConnection.getConnection();
            pstmt = conn.prepareStatement(SELECT_TOP_SELLING);
            rs = pstmt.executeQuery();
            while (rs.next()) {
                int orderDetailID = rs.getInt("id");
                int productID = rs.getInt("productID");
                double price = rs.getDouble("price");
                int totalQuantity = rs.getInt("totalQuantity");
                listOrderDetails.add(new OrderDetail(orderDetailID, price, totalQuantity, productsMap.get(productID), 0));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JdbcConnection.closeConnection(conn, pstmt, rs);
        }
        return listOrderDetails;
    }

    @Override
    public int getTotalSelled(String type) {
        String GET_TOTAL_SELLED = "";
        switch (type) {
            case "DAY":
                GET_TOTAL_SELLED = "SELECT SUM(quantity) as totalSellDay FROM oder_detail od INNER JOIN orders o ON od.OrderID = o.OrderID WHERE DATE(o.OrderDate) = CURRENT_DATE";
                break;
            case "MONTH":
                GET_TOTAL_SELLED = "SELECT SUM(quantity) as totalSellDay FROM oder_detail od INNER JOIN orders o ON od.OrderID = o.OrderID WHERE MONTH(o.OrderDate) = MONTH(CURRENT_DATE)";
                break;
            case "YEAR":
                GET_TOTAL_SELLED = "SELECT SUM(quantity) as totalSellDay FROM oder_detail od INNER JOIN orders o ON od.OrderID = o.OrderID WHERE YEAR(o.OrderDate) = YEAR(CURRENT_DATE)";
                break;
            default:
                GET_TOTAL_SELLED = "SELECT SUM(quantity) as totalSellDay FROM oder_detail od INNER JOIN orders o ON od.OrderID = o.OrderID WHERE DATE(o.OrderDate) = CURRENT_DATE";
                break;
        }
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try {
            conn = JdbcConnection.getConnection();
            pstmt = conn.prepareStatement(GET_TOTAL_SELLED);
            rs = pstmt.executeQuery();
            while (rs.next()) {
                return rs.getInt("totalSellDay");
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JdbcConnection.closeConnection(conn, pstmt, rs);
        }
        return -1;
    }
}
