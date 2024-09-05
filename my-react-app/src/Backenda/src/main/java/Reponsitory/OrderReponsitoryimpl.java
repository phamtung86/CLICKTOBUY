package Reponsitory;

import Ultils.JdbcConnection;
import Entity.Order;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class OrderReponsitoryimpl implements IOrderReponsitory {

    @Override
    public boolean insertOrder(Order order, Integer userID, Integer voucherID) {
        String INSERT_ORDER = "INSERT INTO Orders (TotalAmount, totalFee,UserID,VoucherID) VALUES(?,?,?,?)";
        try (Connection conn = JdbcConnection.getConnection(); PreparedStatement ps = conn.prepareStatement(INSERT_ORDER)) {
            ps.setDouble(1, order.getTotalAmount());
            ps.setDouble(2, order.getTotalFee());
            if (userID != null) {
                ps.setInt(3, userID);
            } else {
                ps.setNull(3, java.sql.Types.INTEGER);
            }
            if (voucherID != null) {
                ps.setInt(4, voucherID);
            } else {
                ps.setNull(4, java.sql.Types.INTEGER);
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
}
