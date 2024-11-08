package Backend.DataLayer;

import Entity.OTP;
import Ultils.JdbcConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class OTPReponsitoryimpl implements  IOTPReponsitory{
    @Override
    public boolean insertOTP(OTP otp) {
        String INSERT_OTP = "INSERT INTO otp_codes(email,otp_code, expiration_time) VALUES(?,?,?)";
        Connection con = null;
        PreparedStatement ps = null;
        try {
            con = JdbcConnection.getConnection();
            ps = con.prepareStatement(INSERT_OTP);
            ps.setString(1, otp.getEmail());
            ps.setString(2, otp.getOtp());
            ps.setTimestamp(3,otp.getExpirationDate());
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JdbcConnection.closeConnection(con, ps, null);
        }
    }

    @Override
    public OTP findOTPByOtpCode(String otpCode) {
        String FIND_OTP_BY_EMAIL = "SELECT * FROM otp_codes WHERE otp_code = ? AND is_active = 0";
        OTP otp = null;
        Connection con = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            con = JdbcConnection.getConnection();
            ps = con.prepareStatement(FIND_OTP_BY_EMAIL);
            ps.setString(1, otpCode);
            rs = ps.executeQuery();
            if (rs.next()) {
                otp = new OTP();
                otp.setEmail(rs.getString("email"));
                otp.setOtp(rs.getString("otp_code"));
                otp.setExpirationDate(rs.getTimestamp("expiration_time"));
                return otp;
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return null;
    }

    @Override
    public boolean updateActiveOTP (String code, int isActiveOTP){
        String UPDATE_OTP_CODE = "UPDATE otp_codes SET is_active = ? WHERE otp_code = ?";
        Connection con = null;
        PreparedStatement ps = null;
        try {
            con = JdbcConnection.getConnection();
            ps = con.prepareStatement(UPDATE_OTP_CODE);
            ps.setInt(1, isActiveOTP);
            ps.setString(2,code);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

}
