package Backend.DataLayer;

import Ultils.JdbcConnection;
import Entity.Categories;
import Entity.Products;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ProductReponsitoryImpl implements IProductReponsitory {
    @Override
    public ArrayList<Products> getAllListProduct(Map<Integer, Categories> categoriesMap ) {
        ICategoriesReponsitory iCategoriesReponsitory = new CategoriesReponsitoryimpl();
        ArrayList<Products> listProducts = new ArrayList<>();
        String SELECT_ALL_PRODUCT = "SELECT * FROM products";
        try (
                Connection con = JdbcConnection.getConnection();
                PreparedStatement psProducts = con.prepareStatement(SELECT_ALL_PRODUCT);
                ResultSet rsProducts = psProducts.executeQuery()) {
            while (rsProducts.next()) {

                int id = rsProducts.getInt("ProductID");
                String productName = rsProducts.getString("ProductName");
                double price = rsProducts.getDouble("Price");
                Timestamp createdAt = rsProducts.getTimestamp("CreatedAt");
                String note = rsProducts.getString("Note");
                String unit = rsProducts.getString("Unit");
                int discount = rsProducts.getInt("Discount");
                String imageLink = rsProducts.getString("ImageLink");
                int idCategory = rsProducts.getInt("CategoryID");
                Categories c = categoriesMap.get(idCategory);
                if (c != null) {
                    listProducts.add(new Products(id, productName, price, createdAt, note, unit, discount, imageLink, c));
                }
            }
            JdbcConnection.closeConnection(con, psProducts, rsProducts);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return listProducts;
    }

    @Override
    public ArrayList<Products> getListProductSale(Map<Integer, Categories> categoriesMap) {
        ICategoriesReponsitory iCategoriesReponsitory = new CategoriesReponsitoryimpl();
        ArrayList<Entity.Products> listProductsSale = new ArrayList<>();
        String SELECT_ALL_PRODUCT_SALE = "SELECT * FROM products WHERE Discount > 0";
        try (
                Connection con = JdbcConnection.getConnection();
                PreparedStatement psProducts = con.prepareStatement(SELECT_ALL_PRODUCT_SALE);
                ResultSet rsProducts = psProducts.executeQuery()) {

            while (rsProducts.next()) {

                int id = rsProducts.getInt("ProductID");
                String productName = rsProducts.getString("ProductName");
                double price = rsProducts.getDouble("Price");
                Timestamp createdAt = rsProducts.getTimestamp("CreatedAt");
                String note = rsProducts.getString("Note");
                String unit = rsProducts.getString("Unit");
                int discount = rsProducts.getInt("Discount");
                String imageLink = rsProducts.getString("ImageLink");
                int idCategory = rsProducts.getInt("CategoryID");
                Categories c = categoriesMap.get(idCategory);
                if (c != null) {
                    listProductsSale.add(new Products(id, productName,  price, createdAt, note, unit, discount, imageLink, c));
                }
            }
            JdbcConnection.closeConnection(con, psProducts, rsProducts);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return listProductsSale;
    }

    @Override
    public ArrayList<Products> getListProductType(int categoryIDType,Map<Integer, Categories> categoriesMap) {
        ArrayList<Products> listProductsType = new ArrayList<>();
        String SELECT_ALL_PRODUCT_TYPE = "SELECT * FROM products WHERE CategoryID = ?";

        // Sử dụng try-with-resources để tự động đóng các tài nguyên
        try (
                Connection con = JdbcConnection.getConnection();
                PreparedStatement psProducts = con.prepareStatement(SELECT_ALL_PRODUCT_TYPE)
        ) {
            psProducts.setInt(1, categoryIDType);
            try (ResultSet rsProducts = psProducts.executeQuery()) {
                while (rsProducts.next()) {
                    int id = rsProducts.getInt("ProductID");
                    String productName = rsProducts.getString("ProductName");
                    double price = rsProducts.getDouble("Price");
                    Timestamp createdAt = rsProducts.getTimestamp("CreatedAt");
                    String note = rsProducts.getString("Note");
                    String unit = rsProducts.getString("Unit");
                    int discount = rsProducts.getInt("Discount");
                    String imageLink = rsProducts.getString("ImageLink");
                    int idCategory = rsProducts.getInt("CategoryID");
                    Categories c = categoriesMap.get(idCategory);
                    if (c != null) {
                        listProductsType.add(new Products(id, productName, price, createdAt, note, unit, discount, imageLink, c));
                    }
                }
            }
            JdbcConnection.closeConnection(con,psProducts,null);
        } catch (SQLException e) {
            // Có thể thêm thông báo log chi tiết hơn nếu cần
            throw new RuntimeException("Lỗi khi truy vấn danh sách sản phẩm theo loại: " + e.getMessage(), e);
        }

        return listProductsType;
    }


    @Override
    public ArrayList<Products> listProductSearchByName(String productName,Map<Integer, Categories> categoriesMap ) {
        ArrayList<Products> listResultProductsSearchByName = new ArrayList<>();
        for(Products product : getAllListProduct(categoriesMap)){
            if(product.getProductName().toLowerCase().contains(productName.toLowerCase())){
                listResultProductsSearchByName.add(product);
            }
        }
        return listResultProductsSearchByName;
    }

    @Override
    public boolean modifyProduct(Products product) {
        String MODIFY_PRODUCT_SQL = "UPDATE products SET ProductName = ?, Price = ?, Note = ?, Unit = ?, Discount = ? WHERE ProductID = ?";
        Connection connection = null;
        PreparedStatement psProducts = null;
        try {
            connection = JdbcConnection.getConnection();
            psProducts = connection.prepareStatement(MODIFY_PRODUCT_SQL);
            psProducts.setString(1, product.getProductName());
            psProducts.setDouble(2, product.getProductPrice());
            psProducts.setString(3, product.getProductNote());
            psProducts.setString(4, product.getProductUnit());
            psProducts.setInt(5, product.getProductDiscount());
            psProducts.setInt(6, product.getProductId());

            int count = psProducts.executeUpdate();
            return count > 0; // Trả về true nếu ít nhất 1 bản ghi được cập nhật
        } catch (SQLException e) {
            e.printStackTrace();
            throw new RuntimeException("Error updating product", e);
        } finally {
          JdbcConnection.closeConnection(connection, psProducts, null);
        }
    }

    @Override
    public boolean insertProduct(Products product,int categoryID) {
        String INSERT_PRODUCT_SQL = "INSERT INTO products (productId,productName, Price,Note,Unit,Discount,ImageLink,CategoryID) VALUES (?,?,?,?,?,?,?,?)";
        Connection connection = null;
        PreparedStatement psProducts = null;
        try {
            connection = JdbcConnection.getConnection();
            psProducts = connection.prepareStatement(INSERT_PRODUCT_SQL);
            psProducts.setInt(1,product.getProductId());
            psProducts.setString(2, product.getProductName());
            psProducts.setDouble(3, product.getProductPrice());
            psProducts.setString(4, product.getProductNote());
            psProducts.setString(5, product.getProductUnit());
            psProducts.setInt(6, product.getProductDiscount());
            psProducts.setString(7,product.getProductImageLink());
            psProducts.setInt(8,categoryID);
            int count = psProducts.executeUpdate();
            return count > 0;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JdbcConnection.closeConnection(connection, psProducts, null);
        }
    }

    @Override
    public boolean deleteProduct(int productID) {
        String INSERT_PRODUCT_SQL = "DELETE FROM products WHERE ProductID = ?";
        Connection connection = null;
        PreparedStatement psProducts = null;
        try {
            connection = JdbcConnection.getConnection();
            psProducts = connection.prepareStatement(INSERT_PRODUCT_SQL);
            psProducts.setInt(1, productID);
            int count = psProducts.executeUpdate();
            return count > 0;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JdbcConnection.closeConnection(connection, psProducts, null);
        }
    }

    @Override
    public Map<Integer, Products> getProductsMap(Map<Integer,Categories> mapCategories) {
        ICategoriesReponsitory iCategoriesReponsitory = new CategoriesReponsitoryimpl();
        Map<Integer, Categories> categoriesMap = iCategoriesReponsitory.getMapCategories();
        Map<Integer,Products> mapProducts = new HashMap<>();
        String SELECT_ALL_PRODUCT = "SELECT * FROM products";
        Connection connection = null;
        PreparedStatement psProducts = null;
        ResultSet rs = null;
        try {
            connection = JdbcConnection.getConnection();
            psProducts = connection.prepareStatement(SELECT_ALL_PRODUCT);
            rs = psProducts.executeQuery();
            while (rs.next()) {
                int productID = rs.getInt("ProductID");
                String productName = rs.getString("ProductName");
                double price = rs.getDouble("Price");
                Timestamp createdAt = rs.getTimestamp("CreatedAt");
                String note = rs.getString("Note");
                String unit = rs.getString("Unit");
                int discount = rs.getInt("Discount");
                String imageLink = rs.getString("ImageLink");
                int idCategory = rs.getInt("CategoryID");
                Categories c = mapCategories.get(idCategory);
                if (c != null) {
                    Products p = new Products(productID, productName, price, createdAt, note, unit, discount, imageLink, c);
                    mapProducts.put(productID, p);
                }
            }
            return mapProducts;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JdbcConnection.closeConnection(connection,psProducts,rs);
        }
    }

    @Override
    public List<Products> findProductByCategoryID(int categoryID) {
        String FIND_PRODUCT_BY_CATEGORY_ID = "SELECT * FROM products WHERE CategoryID = ?";
        List<Products> listProducts = new ArrayList<>();
        Connection connection = null;
        PreparedStatement psProducts = null;
        ResultSet rs = null;
        try {
            connection = JdbcConnection.getConnection();
            psProducts = connection.prepareStatement(FIND_PRODUCT_BY_CATEGORY_ID);
            psProducts.setInt(1,categoryID);
            rs = psProducts.executeQuery();
            while (rs.next()) {
                int productID = rs.getInt("ProductID");
                String productName = rs.getString("ProductName");
                double price = rs.getDouble("Price");
                Timestamp createdAt = rs.getTimestamp("CreatedAt");
                String note = rs.getString("Note");
                String unit = rs.getString("Unit");
                int discount = rs.getInt("Discount");
                String imageLink = rs.getString("ImageLink");
                Products products = new Products(productID, productName, price, createdAt, note, unit, discount, imageLink);
                listProducts.add(products);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return listProducts;
    }

}
