package Backend.DataLayer;

import Backend.BusinessLayer.IOrderDetailServices;
import Backend.BusinessLayer.OrderDetailServicesimpl;
import Entity.*;
import Ultils.JdbcConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ExportInventoryReponsitoryimpl implements IExportInventoryReponsiroty {
    @Override
    public boolean insertExportInventory(ExportInventory exportInventory) {
        String INSERT_EXPORT_INVENTORY = "INSERT INTO export_inventory (price,note,create_by,product_id,user_id,order_id) VALUES (?,?,?,?,?,?)";
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        try {
            connection = JdbcConnection.getConnection();
            preparedStatement = connection.prepareStatement(INSERT_EXPORT_INVENTORY);
            preparedStatement.setDouble(1, exportInventory.getPrice());
            preparedStatement.setString(2, exportInventory.getNote());
            preparedStatement.setInt(3, exportInventory.getUserCreate().getUserID());
            preparedStatement.setInt(4, exportInventory.getProducts().getProductId());
            preparedStatement.setInt(5, exportInventory.getUserOrder().getUserID());
            preparedStatement.setInt(6, exportInventory.getOrder().getOrderID());
            return preparedStatement.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<ExportInventory> getExportInventories(String sql,Map<Integer, Users> mapUsers, Map<Integer, Products> mapProducts,Map<Integer,OrderDetail> mapOrderDetails) {

        List<ExportInventory> exportInventories = new ArrayList<>();
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            connection = JdbcConnection.getConnection();
            preparedStatement = connection.prepareStatement(sql);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                Timestamp date = resultSet.getTimestamp("date");
                double price = resultSet.getDouble("price");
                String note = resultSet.getString("note");
                int idUserCreate = resultSet.getInt("create_by");
                int productId = resultSet.getInt("product_id");
                int idUserOrder = resultSet.getInt("user_id");
                int orderId = resultSet.getInt("order_id");
                Users userCreate = mapUsers.get(idUserCreate);
                Users userOrder = mapUsers.get(idUserOrder);
                Products product = mapProducts.get(productId);
                OrderDetail orderDetail = mapOrderDetails.get(orderId);
                ExportInventory exportInventory = new ExportInventory(id,date,price,note,userCreate,product,userOrder,orderDetail);

                exportInventories.add(exportInventory);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return exportInventories;
    }
}
