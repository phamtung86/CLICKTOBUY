package Services;
import java.sql.*;
import java.util.ArrayList;

public class Productservice {
    static final String URL =  "jdbc:mysql: //localhost:3306/book";
    static final String USER = "root";
    static final String PASS = "root";
    static final String SELECT_ALL_PRODUCT = "SELECT * FROM products";
    protected Connection getConnection() {
        Connection connection = null;
        try {
            connection = DriverManager.getConnection(URL, USER, PASS);
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return connection;
    }

    public ArrayList<modal.Products> selectAllProducts() {
        ArrayList<modal.Products> listProducts = new ArrayList<>();
        try {
            Connection connection = getConnection();
            PreparedStatement psta = connection.prepareStatement(SELECT_ALL_PRODUCT);
            ResultSet rs = psta.executeQuery();
            while(rs.next()){
                modal.Products product = new modal.Products(
                        rs.getInt("ProductID"),
                        rs.getString("ProductName"),
                        rs.getString("Description"),
                        rs.getDouble("Price"),
                        rs.getInt("Stock"),
                        rs.getTimestamp("CreatedAt"),
                        rs.getString("Note"),
                        rs.getString("Unit"),
                        rs.getInt("Discount"),
                        rs.getString("ImageLink"),
                        rs.getInt("CategoryID")
                );
                listProducts.add(product);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return listProducts;
    }

}