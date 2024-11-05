package Backend.DataLayer;

import Backend.BusinessLayer.IProductServices;
import Backend.BusinessLayer.ProductServicesimpl;
import Entity.Inventory;
import Entity.Products;
import Ultils.JdbcConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class InventoryReponsitoryipml implements IInventoryReponsitory{
    @Override
    public List<Inventory> getAllInventorys(Map<Integer, Products> mapProducts) {
        String GET_ALL_INVENTORY = "SELECT * FROM Inventory";
        List<Inventory> inventoryList = new ArrayList<>();
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            connection = JdbcConnection.getConnection();
            preparedStatement = connection.prepareStatement(GET_ALL_INVENTORY);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                int currentQuantity = resultSet.getInt("current_quantity");
                Timestamp lastUpdate = resultSet.getTimestamp("last_update");
                int safeStockLevel = resultSet.getInt("safe_stock_level");
                int reoderPoint = resultSet.getInt("reoder_point");
                int productId = resultSet.getInt("product_id");
                Products products = mapProducts.get(productId);
                Inventory inventory = new Inventory(id,currentQuantity,lastUpdate, safeStockLevel, reoderPoint, products);
                inventoryList.add(inventory);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JdbcConnection.closeConnection(connection,preparedStatement,resultSet);
        }
        return inventoryList;
    }

    @Override
    public boolean updateQuantityAfterImport(int quantity, int productId) {
        String UPDATE_QUANTITY = "UPDATE Inventory SET current_quantity = current_quantity + ?, last_update = CURRENT_TIMESTAMP WHERE product_id = ?";

        Connection connection = null;
        PreparedStatement preparedStatement = null;
        try {
            connection = JdbcConnection.getConnection();
            preparedStatement = connection.prepareStatement(UPDATE_QUANTITY);
            preparedStatement.setInt(1, quantity);
            preparedStatement.setInt(2, productId);
            return preparedStatement.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            if (preparedStatement != null) {
                try { preparedStatement.close(); } catch (SQLException e) { e.printStackTrace(); }
            }
            if (connection != null) {
                try { connection.close(); } catch (SQLException e) { e.printStackTrace(); }
            }
        }
    }


    @Override
    public List<Inventory> getInventoriresPreOutOfStock(Map<Integer, Products> mapProducts) {
        IProductServices iProductServices = new ProductServicesimpl();
        String GET_INVENTORY_PRE_OUT_OF_STOCK = "SELECT * FROM Inventory WHERE current_quantity <= 50";
        List<Inventory> listInventoryPreOutOfStock = new ArrayList<>();
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            connection = JdbcConnection.getConnection();
            preparedStatement = connection.prepareStatement(GET_INVENTORY_PRE_OUT_OF_STOCK);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                int currentQuantity = resultSet.getInt("current_quantity");
                Timestamp lastUpdate = resultSet.getTimestamp("last_update");
                int safeStockLevel = resultSet.getInt("safe_stock_level");
                int reoderPoint = resultSet.getInt("reoder_point");
                int productId = resultSet.getInt("product_id");
                Products products = mapProducts.get(productId);
                Inventory inventory = new Inventory(id,currentQuantity,lastUpdate, safeStockLevel, reoderPoint, products);
                listInventoryPreOutOfStock.add(inventory);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JdbcConnection.closeConnection(connection,preparedStatement,resultSet);
        }
        return listInventoryPreOutOfStock;
    }

    @Override
    public boolean createInventory(int productId) {
        String INSERT_INVENTORY = "INSERT INTO inventory (product_id) VALUES (?)";
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        try {
            connection = JdbcConnection.getConnection();
            preparedStatement = connection.prepareStatement(INSERT_INVENTORY);
            preparedStatement.setInt(1, productId);
            return preparedStatement.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JdbcConnection.closeConnection(connection, preparedStatement, null);
        }
    }

    @Override
    public Inventory findInventoryByProductId(int productId, Map<Integer, Products> mapProducts) {
        String GET_INVENTORY = "SELECT * FROM inventory WHERE product_id = ?";
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            connection = JdbcConnection.getConnection();
            preparedStatement = connection.prepareStatement(GET_INVENTORY);
            preparedStatement.setInt(1, productId);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                int currentQuantity = resultSet.getInt("current_quantity");
                Timestamp lastUpdate = resultSet.getTimestamp("last_update");
                int safeStockLevel = resultSet.getInt("safe_stock_level");
                int reoderPoint = resultSet.getInt("reoder_point");
                int productID = resultSet.getInt("product_id");
                Products products = mapProducts.get(productID);
                Inventory inventory = new Inventory(id,currentQuantity,lastUpdate, safeStockLevel, reoderPoint, products);
                return inventory;
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return null;
    }

}
