package Reponsitory;

import Ultils.JdbcConnection;
import Entity.Categories;
import Entity.Products;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class ProductReponsitoryImpl implements IProductReponsitory {
    @Override
    public ArrayList<Products> getAllListProduct() {
        ArrayList<Entity.Products> listProductsSale = new ArrayList<>();
        Map<Integer, Categories> categoriesMap = new HashMap<Integer, Categories>();
        String SELECT_ALL_PRODUCT_SALE = "SELECT * FROM products ";
        String SELECT_ALL_CATEGORY = "SELECT * FROM categories";
        try (
                Connection con = JdbcConnection.getConnection();
                PreparedStatement psCategories = con.prepareStatement(SELECT_ALL_CATEGORY);
                ResultSet rsCategories = psCategories.executeQuery();
                PreparedStatement psProducts = con.prepareStatement(SELECT_ALL_PRODUCT_SALE);
                ResultSet rsProducts = psProducts.executeQuery()) {
            while (rsCategories.next()) {
                Categories categories = new Categories(
                        rsCategories.getInt("CategoryID"),
                        rsCategories.getString("CategoryName"),
                        rsCategories.getDate("CreatedAt"),
                        rsCategories.getString("CategoryImageLink")
                );
                categoriesMap.put(categories.getCategoryId(), categories);
            }

            while (rsProducts.next()) {

                int id = rsProducts.getInt("ProductID");
                String productName = rsProducts.getString("ProductName");
                String description = rsProducts.getString("Description");
                double price = rsProducts.getDouble("Price");
                Timestamp createdAt = rsProducts.getTimestamp("CreatedAt");
                String note = rsProducts.getString("Note");
                String unit = rsProducts.getString("Unit");
                int discount = rsProducts.getInt("Discount");
                String imageLink = rsProducts.getString("ImageLink");
                int idCategory = rsProducts.getInt("CategoryID");
                Categories c = categoriesMap.get(idCategory);
                if (c != null) {
                    listProductsSale.add(new Products(id, productName, description, price, createdAt, note, unit, discount, imageLink, c));
                }
            }
            JdbcConnection.closeConnection(con, psCategories, rsCategories);
            JdbcConnection.closeConnection(con, psProducts, rsProducts);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return listProductsSale;
    }
}
