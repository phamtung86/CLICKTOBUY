package Backend.DataLayer;

import Ultils.JdbcConnection;
import Entity.VoucherDetail;
import Entity.VoucherDetailType;
import Entity.Vouchers;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class VoucherReponsitoryimpl implements IVoucherReponsitory {
    @Override
    public ArrayList<VoucherDetail> getListAllVoucherDetail() {
        String SELECT_ALL_VOUCHER = "SELECT * FROM vouchers";
        String SELECT_ALL_VOUCHER_DETAIL_TYPE = "SELECT * FROM voucher_detail_type";
        String SELECT_ALL_VOUCHER_DETAIL = "SELECT * FROM voucher_detail";
        Map<Integer, Vouchers> voucherMap = new HashMap<>();
        Map<Integer, VoucherDetailType> voucherDetailTypeMap = new HashMap<>();
        ArrayList<VoucherDetail> listVouchersDetail = new ArrayList<>();

        try {
            Connection conn = JdbcConnection.getConnection();
            PreparedStatement psVoucher = conn.prepareStatement(SELECT_ALL_VOUCHER);
            ResultSet rsVoucher = psVoucher.executeQuery();
            PreparedStatement psVoucherDetailType = conn.prepareStatement(SELECT_ALL_VOUCHER_DETAIL_TYPE);
            ResultSet rsVoucherDetailType = psVoucherDetailType.executeQuery();
            PreparedStatement psVoucherDetail = conn.prepareStatement(SELECT_ALL_VOUCHER_DETAIL);
            ResultSet rsVoucherDetail = psVoucherDetail.executeQuery();
            while (rsVoucher.next()) {
                Vouchers voucher = new Vouchers(
                        rsVoucher.getInt("VoucherID"),
                        rsVoucher.getString("code"),
                        rsVoucher.getString("VoucherName"),
                        rsVoucher.getDouble("minOrderAmount"),
                        rsVoucher.getDouble("maxOrderAmount"),
                        rsVoucher.getDate("CreatedAt"),
                        rsVoucher.getDate("ExpiryDate")
                );
                voucherMap.put(voucher.getId(), voucher);
            }

            // Load all voucher detail types into a map
            while (rsVoucherDetailType.next()) {
                VoucherDetailType voucherDetailType = new VoucherDetailType(
                        rsVoucherDetailType.getInt("id"),
                        rsVoucherDetailType.getString("Type")
                );
                voucherDetailTypeMap.put(voucherDetailType.getId(), voucherDetailType);
            }


            while (rsVoucherDetail.next()) {
                int id = rsVoucherDetail.getInt("id");
                int value = rsVoucherDetail.getInt("value");
                int voucherID = rsVoucherDetail.getInt("VoucherID");
                int voucherDetailTypeID = rsVoucherDetail.getInt("Voucher_Detail_Type_ID");

                Vouchers voucher = voucherMap.get(voucherID);
                VoucherDetailType voucherDetailType = voucherDetailTypeMap.get(voucherDetailTypeID);

                if (voucher != null && voucherDetailType != null) {
                    listVouchersDetail.add(new VoucherDetail(id, value, voucher, voucherDetailType));
                }
            }
            JdbcConnection.closeConnection(conn, psVoucher, rsVoucher);
            JdbcConnection.closeConnection(conn, psVoucherDetailType, rsVoucherDetail);
            JdbcConnection.closeConnection(conn, psVoucherDetail, rsVoucherDetail);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }


        return listVouchersDetail;
    }
}
