package Backend.DataLayer;

import Ultils.JdbcConnection;
import Entity.Users;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class UserReponsitoryimpl implements IUserReponsitory {
    @Override
    public ArrayList<Users> getAllUsers() {
        String SELECT_ALL_USERS = "SELECT * FROM Users";
        ArrayList<Users> listUsers = new ArrayList<>();
        Connection connection = null;
        PreparedStatement psta = null;
        ResultSet rs = null;
        try {

            connection = JdbcConnection.getConnection();
            psta = connection.prepareStatement(SELECT_ALL_USERS);
            rs = psta.executeQuery();
            while (rs.next()) {
                int id = rs.getInt("UserID");
                String userName = rs.getString("UserName");
                String passWord = rs.getString("Password");
                String fullName = rs.getString("FullName");
                String email = rs.getString("Email");
                String phoneNumber = rs.getString("PhoneNumber");
                String address = rs.getString("Address");
                String role = rs.getString("Role");
                Date d = rs.getDate("CreatedAt");
                int status = rs.getInt("Status");
                Users user = new Users(id, userName, passWord, fullName, email, phoneNumber, address, role, d,status);
                listUsers.add(user);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JdbcConnection.closeConnection(connection, psta, rs);
        }
        return listUsers;
    }

    @Override
    public boolean insertUser(Users user) {
        String INSERT_USER = "INSERT INTO Users (Username,Password,FullName,Email,PhoneNumber,Address) VALUES(?,?,?,?,?,?)";
        Connection connection = null;
        PreparedStatement psta = null;
        try {
            connection = JdbcConnection.getConnection();
            psta = connection.prepareStatement(INSERT_USER);

            // Thiết lập giá trị cho các tham so
            psta.setString(1, user.getUserName());
            psta.setString(2, user.getPassword());
            psta.setString(3, user.getFullName());
            psta.setString(4, user.getEmail());
            psta.setString(5, user.getPhoneNumber());
            psta.setString(6, user.getAddress());
            // Thực hiện câu lệnh SQL
            int count = psta.executeUpdate();
            if (count > 0) {
                return true;
            }
        } catch (SQLException e) {
            throw new RuntimeException("Error inserting user", e);
        } finally {
            JdbcConnection.closeConnection(connection, psta, null);

        }
        return false;
    }

    @Override
    public boolean checkPhoneNumber(String phoneNumber) {
        for (Users user : getAllUsers()) {
            if (phoneNumber.equals(user.getPhoneNumber())) {
                return true;
            }
        }
        return false;
    }

    @Override
    public Users getInfoFromPhoneNumber(String phoneNumber) {
        if (checkPhoneNumber(phoneNumber)) {
            for (Users u : getAllUsers()) {
                if (phoneNumber.equals(u.getPhoneNumber())) {
                    return u;
                }
            }
        }
        return null;
    }

    @Override
    public int getIdFromUserName(String userName) {
        for (Users user : getAllUsers()) {
            if (user.getUserName().equals(userName)) {
                return user.getUserID();
            }
        }
        return -1;
    }

    @Override
    public int getQuantityUser() {
        String GET_ALL_USERS_QUANTITY = "SELECT COUNT(*) as totalUser FROM users WHERE Role = 'CUSTOMER'";
        Connection connection = null;
        PreparedStatement psta = null;
        ResultSet rs = null;
        try {
            connection = JdbcConnection.getConnection();
            psta = connection.prepareStatement(GET_ALL_USERS_QUANTITY);
            rs = psta.executeQuery();
            while (rs.next()) {
                return rs.getInt("totalUser");
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return -1;
    }

    @Override
    public Map<Integer, Users> getMapUsers() {
        Map<Integer, Users> mapUsers = new HashMap<>();
        String SELECT_ALL_USERS = "SELECT * FROM Users";
        Connection connection = null;
        PreparedStatement psta = null;
        ResultSet rs = null;
        try {

            connection = JdbcConnection.getConnection();
            psta = connection.prepareStatement(SELECT_ALL_USERS);
            rs = psta.executeQuery();
            while (rs.next()) {
                int id = rs.getInt("UserID");
                String userName = rs.getString("UserName");
                String passWord = rs.getString("Password");
                String fullName = rs.getString("FullName");
                String email = rs.getString("Email");
                String phoneNumber = rs.getString("PhoneNumber");
                String address = rs.getString("Address");
                String role = rs.getString("Role");
                Date d = rs.getDate("CreatedAt");
                int status = rs.getInt("Status");
                Users user = new Users(id, userName, passWord, fullName, email, phoneNumber, address, role, d,status);
                mapUsers.put(id, user);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JdbcConnection.closeConnection(connection, psta, rs);
        }
        return mapUsers;
    }

    @Override
    public boolean updateStatusUser(int id, int status) {
        String UPDATE_STATUS_USER = "UPDATE Users SET Status = ? WHERE UserID = ?";
        Connection connection = null;
        PreparedStatement psta = null;
        try {
            connection = JdbcConnection.getConnection();
            psta = connection.prepareStatement(UPDATE_STATUS_USER);
            psta.setInt(1, status);
            psta.setInt(2, id);
            int count = psta.executeUpdate();
            if (count > 0) {
                return true;
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return false;
    }
}
