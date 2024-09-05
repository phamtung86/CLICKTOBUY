package Ultils;

import java.sql.*;

public class JdbcConnection {
    public static Connection getConnection() {
        Connection con = null;
        String URL = "jdbc:mysql://localhost:3306/book";
        String USER = "root";
        String PASS = "root";
        try {
            con = DriverManager.getConnection(URL, USER, PASS);

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return con;
    }

    public static void closeConnection(Connection con,PreparedStatement pst,ResultSet rs)  {
       try {
           if(rs != null) {
               rs.close();
           }
           if(pst != null) {
               pst.close();
           }
           if(con != null && !con.isClosed()) {
               con.close();
           }
       } catch (SQLException e) {
           throw new RuntimeException(e);
       }
    }
}
