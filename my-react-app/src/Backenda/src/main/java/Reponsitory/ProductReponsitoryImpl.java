package Reponsitory;

import Ultils.JdbcConnection;
import Entity.Categories;
import Entity.Products;
import controller.CategoriesController;

import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class ProductReponsitoryImpl implements IProductReponsitory {
    @Override
    public ArrayList<Products> getAllListProduct() {
        CategoriesController categoriesController = new CategoriesController();
        ArrayList<Entity.Products> listProducts = new ArrayList<>();
        Map<Integer, Categories> categoriesMap = categoriesController.getMapCategories();
        String SELECT_ALL_PRODUCT = "SELECT * FROM products";
        try (
                Connection con = JdbcConnection.getConnection();
                PreparedStatement psProducts = con.prepareStatement(SELECT_ALL_PRODUCT);
                ResultSet rsProducts = psProducts.executeQuery()) {
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
                    listProducts.add(new Products(id, productName, description, price, createdAt, note, unit, discount, imageLink, c));
                }
            }
            JdbcConnection.closeConnection(con, psProducts, rsProducts);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return listProducts;
    }

    @Override
    public ArrayList<Products> getListProductSale() {
        CategoriesController categoriesController = new CategoriesController();
        ArrayList<Entity.Products> listProductsSale = new ArrayList<>();
        Map<Integer, Categories> categoriesMap = categoriesController.getMapCategories();
        String SELECT_ALL_PRODUCT_SALE = "SELECT * FROM products WHERE Discount > 0";
        try (
                Connection con = JdbcConnection.getConnection();
                PreparedStatement psProducts = con.prepareStatement(SELECT_ALL_PRODUCT_SALE);
                ResultSet rsProducts = psProducts.executeQuery()) {

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
            JdbcConnection.closeConnection(con, psProducts, rsProducts);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return listProductsSale;
    }

    @Override
    public ArrayList<Products> getListProductMilk() {
        CategoriesController categoriesController = new CategoriesController();
        ArrayList<Entity.Products> listProductsMilk = new ArrayList<>();
        Map<Integer, Categories> categoriesMap = categoriesController.getMapCategories();
        String SELECT_ALL_PRODUCT_MILK = "SELECT * FROM products WHERE CategoryID = 1";
        try (
                Connection con = JdbcConnection.getConnection();
                PreparedStatement psProducts = con.prepareStatement(SELECT_ALL_PRODUCT_MILK);
                ResultSet rsProducts = psProducts.executeQuery()) {

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
                    listProductsMilk.add(new Products(id, productName, description, price, createdAt, note, unit, discount, imageLink, c));
                }
            }
            JdbcConnection.closeConnection(con, psProducts, rsProducts);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return listProductsMilk;
    }

    @Override
    public ArrayList<Products> getListProductVegetable() {
        CategoriesController categoriesController = new CategoriesController();
        ArrayList<Entity.Products> listProductsVegetable = new ArrayList<>();
        Map<Integer, Categories> categoriesMap = categoriesController.getMapCategories();
        String SELECT_ALL_PRODUCT_VEGETABLE = "SELECT * FROM products WHERE CategoryID = 2";
        try (
                Connection con = JdbcConnection.getConnection();
                PreparedStatement psProducts = con.prepareStatement(SELECT_ALL_PRODUCT_VEGETABLE);
                ResultSet rsProducts = psProducts.executeQuery()) {

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
                    listProductsVegetable.add(new Products(id, productName, description, price, createdAt, note, unit, discount, imageLink, c));
                }
            }
            JdbcConnection.closeConnection(con, psProducts, rsProducts);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return listProductsVegetable;
    }

    @Override
    public ArrayList<Products> getListProductCleanChemical() {
        CategoriesController categoriesController = new CategoriesController();
        ArrayList<Entity.Products> listProductsCleanChemical = new ArrayList<>();
        Map<Integer, Categories> categoriesMap = categoriesController.getMapCategories();
        String SELECT_ALL_PRODUCT_CLEAN_CHEMICAL = "SELECT * FROM products WHERE CategoryID = 3";
        try (
                Connection con = JdbcConnection.getConnection();
                PreparedStatement psProducts = con.prepareStatement(SELECT_ALL_PRODUCT_CLEAN_CHEMICAL);
                ResultSet rsProducts = psProducts.executeQuery()) {
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
                    listProductsCleanChemical.add(new Products(id, productName, description, price, createdAt, note, unit, discount, imageLink, c));
                }
            }
            JdbcConnection.closeConnection(con, psProducts, rsProducts);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return listProductsCleanChemical;
    }

    @Override
    public ArrayList<Products> getListProductTakeCare() {
        CategoriesController categoriesController = new CategoriesController();
        ArrayList<Entity.Products> listProductsTakeCare = new ArrayList<>();
        Map<Integer, Categories> categoriesMap = categoriesController.getMapCategories();
        String SELECT_ALL_PRODUCT_TAKE_CARE = "SELECT * FROM products WHERE CategoryID = 4";
        try (
                Connection con = JdbcConnection.getConnection();
                PreparedStatement psProducts = con.prepareStatement(SELECT_ALL_PRODUCT_TAKE_CARE);
                ResultSet rsProducts = psProducts.executeQuery()) {
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
                    listProductsTakeCare.add(new Products(id, productName, description, price, createdAt, note, unit, discount, imageLink, c));
                }
            }
            JdbcConnection.closeConnection(con, psProducts, rsProducts);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return listProductsTakeCare;
    }

    @Override
    public ArrayList<Products> listProductSearchByName(String productName) {
        ArrayList<Products> listResultProductsSearchByName = new ArrayList<>();
        for(Products product : getAllListProduct()){
            if(product.getProductName().toLowerCase().contains(productName.toLowerCase())){
                listResultProductsSearchByName.add(product);
            }
        }
        return listResultProductsSearchByName;
    }
}
