package Backend.DataLayer;

import Entity.Vouchers;
import Ultils.JdbcConnection;

import java.sql.*;
import java.util.ArrayList;
import java.sql.Date;
import java.util.HashMap;
import java.util.Map;

public class VoucherReponsitoryimpl implements IVoucherReponsitory {
    @Override
    public ArrayList<Vouchers> getListAllVouchers() {
        String SELECT_ALL_VOUCHER = "SELECT * FROM vouchers";
        ArrayList<Vouchers> listVouchers = new ArrayList<>();

        try {
            Connection conn = JdbcConnection.getConnection();
            PreparedStatement psVoucher = conn.prepareStatement(SELECT_ALL_VOUCHER);
            ResultSet rsVoucher = psVoucher.executeQuery();
            while (rsVoucher.next()) {
                Vouchers voucher = new Vouchers(
                        rsVoucher.getInt("VoucherID"),
                        rsVoucher.getString("code"),
                        rsVoucher.getString("VoucherName"),
                        rsVoucher.getDouble("minOrderAmount"),
                        rsVoucher.getDouble("maxOrderAmount"),
                        rsVoucher.getTimestamp("CreatedAt"),
                        rsVoucher.getDate("ExpiryDate"),
                        rsVoucher.getInt("value"),
                        rsVoucher.getString("type"),
                        rsVoucher.getInt("status")
                );
                listVouchers.add(voucher);
            }


            JdbcConnection.closeConnection(conn, psVoucher, rsVoucher);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }


        return listVouchers;
    }

    @Override
    public Map<Integer, Vouchers> mapVoucherByVoucherID() {
        Map<Integer, Vouchers> mapVoucherByVoucherID = new HashMap<>();
        String SELECT_ALL_VOUCHER = "SELECT * FROM vouchers";
        Connection conn = null;
        PreparedStatement psVoucher = null;
        ResultSet rsVoucher = null;
        try {
            conn = JdbcConnection.getConnection();
            psVoucher = conn.prepareStatement(SELECT_ALL_VOUCHER);
            rsVoucher = psVoucher.executeQuery();
            while (rsVoucher.next()) {
                int voucherID = rsVoucher.getInt("VoucherID");
                String code = rsVoucher.getString("Code");
                String voucherName = rsVoucher.getString("VoucherName");
                double minOrderAmount = rsVoucher.getDouble("minOrderAmount");
                double maxOrderAmount = rsVoucher.getDouble("maxOrderAmount");
                Timestamp createdAt = rsVoucher.getTimestamp("CreatedAt");
                Date expiryDate = rsVoucher.getDate("ExpiryDate");
                int value = rsVoucher.getInt("value");
                String type = rsVoucher.getString("type");
                Vouchers voucher = new Vouchers(voucherID,code,voucherName,minOrderAmount,maxOrderAmount, createdAt,expiryDate,value,type);
                mapVoucherByVoucherID.put(voucherID, voucher);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JdbcConnection.closeConnection(conn, psVoucher, rsVoucher);
        }
        return mapVoucherByVoucherID;
    }

    @Override
    public Vouchers findVoucherById(String voucherCode) {
        for (Vouchers voucher : getListAllVouchers()) {
            if (voucher.getCode().equals(voucherCode)) {
                return voucher;
            }
        }
        return null;
    }

    @Override
    public boolean updateVoucher(Vouchers voucher) {
        String INSERT_VOUCHER = ("UPDATE vouchers SET Code = ?, VoucherName = ?, MinOrderAmount = ?, MaxOrderAmount = ?, CreatedAt = ?, ExpiryDate = ?, value = ?, type = ? WHERE VoucherID = ?");
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        try {
            connection = JdbcConnection.getConnection();
            preparedStatement = connection.prepareStatement(INSERT_VOUCHER);
            preparedStatement.setString(1, voucher.getCode());
            preparedStatement.setString(2, voucher.getName());
            preparedStatement.setDouble(3, voucher.getMinOrderAmount());
            preparedStatement.setDouble(4, voucher.getMaxOrderAmount());
            preparedStatement.setTimestamp(5,voucher.getCreateAt());
            preparedStatement.setDate(6,voucher.getExpriryDate());
            preparedStatement.setInt(7, voucher.getValue());
            preparedStatement.setString(8, voucher.getType());
            preparedStatement.setInt(9, voucher.getId());
            return preparedStatement.executeUpdate() >0;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JdbcConnection.closeConnection(connection,preparedStatement,null);
        }
    }

    @Override
    public boolean createNewVoucher(Vouchers voucher) {
        String INSERT_VOUCHER = "INSERT INTO vouchers (Code, VoucherName, MinOrderAmount, MaxOrderAmount, CreatedAt, ExpiryDate, value, type) VALUES (?, ?, ?, ?, ?, ?,?,?)";
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        try {
            connection = JdbcConnection.getConnection();
            preparedStatement = connection.prepareStatement(INSERT_VOUCHER);
            preparedStatement.setString(1, voucher.getCode());
            preparedStatement.setString(2, voucher.getName());
            preparedStatement.setDouble(3, voucher.getMinOrderAmount());
            preparedStatement.setDouble(4, voucher.getMaxOrderAmount());
            preparedStatement.setTimestamp(5,voucher.getCreateAt());
            preparedStatement.setDate(6,voucher.getExpriryDate());
            preparedStatement.setInt(7, voucher.getValue());
            preparedStatement.setString(8, voucher.getType());
            return preparedStatement.executeUpdate() >0;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean updateStatusVoucher(int id, int status) {
        String INSERT_VOUCHER = ("UPDATE vouchers SET status = ? WHERE VoucherID = ?");
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        try {
            connection = JdbcConnection.getConnection();
            preparedStatement = connection.prepareStatement(INSERT_VOUCHER);
            preparedStatement.setInt(1, status);
            preparedStatement.setInt(2, id);
            return preparedStatement.executeUpdate() >0;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JdbcConnection.closeConnection(connection,preparedStatement,null);
        }
    }


}
