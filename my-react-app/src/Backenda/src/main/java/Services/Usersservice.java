package Services;

import com.google.gson.Gson;
import controller.UsersController;
import modal.Users;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;

public class Usersservice {
    private final Usersservice usersservice = new Usersservice();
    private final UsersController usersController = new UsersController(usersservice);
    private final Gson gson = new Gson();
    static final String URL = "jdbc:mysql://localhost:3306/book";
    static final String USER = "root";
    static final String PASS = "root";
    static final String SELECT_ALL_USERS = "SELECT * FROM Users";
    static final String INSERT_USER = "INSERT INTO Users (Username,Password,FullName,Email,PhoneNumber,Address) VALUES(?,?,?,?,?,?)";

    public ArrayList<Users> getAllUsers() {
        ArrayList<Users> listUsers = new ArrayList<>();
        Connection connection = null;
        PreparedStatement psta = null;
        ResultSet rs = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection(URL, USER, PASS);
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
                Users user = new Users(id, userName, passWord, fullName, email, phoneNumber, address, role, d);
                listUsers.add(user);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
        return listUsers;
    }

    public void insertUser(Users user) {
        Connection connection = null;
        PreparedStatement psta = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection(URL, USER, PASS);
            psta = connection.prepareStatement(INSERT_USER);

            // Thiết lập giá trị cho các tham so
            psta.setString(1, user.getUserName());
            psta.setString(2, user.getPassword());
            psta.setString(3, user.getFullName());
            psta.setString(4, user.getEmail());
            psta.setString(5, user.getPhoneNumber());
            psta.setString(6, user.getAddress());
            // Thực hiện câu lệnh SQL
            psta.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException("Error inserting user", e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException("JDBC Driver not found", e);
        } finally {
            // Đảm bảo tài nguyên được đóng đúng cách
            try {
                if (psta != null) psta.close();
                if (connection != null) connection.close();
            } catch (SQLException e) {
                throw new RuntimeException("Error closing resources", e);
            }
        }
    }

    public boolean checkPhoneNumber(String phoneNumber) {
        for (Users user : getAllUsers()) {
            if (phoneNumber.equals(user.getPhoneNumber())) {
                return true;
            }
        }
        return false;
    }

    public Users getInfoFromPhoneNumber(String phoneNumber) {
        Users user = null;
        System.out.println(getAllUsers());
        System.out.println(phoneNumber);
        if (checkPhoneNumber(phoneNumber)) {
            for (Users u : getAllUsers()) {
                if (phoneNumber.equals(u.getPhoneNumber())) {
                    user = new Users(u.getUserID(),u.getUserName(),u.getPassword(),u.getFullName(),u.getEmail(),u.getPhoneNumber(),u.getAddress(),u.getRole(),u.getCreateAt());
                }
            }
        }
        return user;
    }
}
