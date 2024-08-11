package Services;
import modal.Categories;

import javax.xml.namespace.QName;
import java.sql.*;
import java.util.ArrayList;

public class Productservice {
    static final String URL = "jdbc:mysql://localhost:3306/book";
    static final String USER = "root";
    static final String PASS = "root";
    static final String SELECT_ALL_PRODUCT_SALE = "SELECT * FROM products ";
    static final String SELECT_ALL_CATEGORY = "SELECT * FROM categories";
    public Categories findCategoriesById (int id){
        ArrayList<Categories> listCategories = new ArrayList<>();
        Connection connection = null;
        PreparedStatement psta = null;
        ResultSet rs = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection(URL, USER, PASS);
            psta = connection.prepareStatement(SELECT_ALL_CATEGORY);
            rs = psta.executeQuery();

            while (rs.next()) {
               Categories categories = new Categories(
                       rs.getInt("CategoryID"),
                       rs.getString("CategoryName"),
                       rs.getDate("CreatedAt")
               );
               listCategories.add(categories);
            }
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        } finally {

            try {
                if (rs != null) rs.close();
                if (psta != null) psta.close();
                if (connection != null) connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        Categories c = null ;
        for (Categories categories : listCategories) {
            if(id == categories.getCategoryId()){
                c = new Categories(categories.getCategoryId(), categories.getCategoryName(), categories.getCreateAt());
            }
        }
        return c;
    }

    public ArrayList<modal.Products> selectAllProducts() {
        ArrayList<modal.Products> listProductsSale = new ArrayList<>();
        Connection connection = null;
        PreparedStatement psta = null;
        ResultSet rs = null;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection(URL, USER, PASS);
            psta = connection.prepareStatement(SELECT_ALL_PRODUCT_SALE);
            rs = psta.executeQuery();

            while (rs.next()) {
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
                        rs.getInt("CategoryID"),
                        findCategoriesById(rs.getInt("CategoryID"))
                );

                listProductsSale.add(product);
            }
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        } finally {
            try {
                if (rs != null) rs.close();
                if (psta != null) psta.close();
                if (connection != null) connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return listProductsSale;
    }

}
