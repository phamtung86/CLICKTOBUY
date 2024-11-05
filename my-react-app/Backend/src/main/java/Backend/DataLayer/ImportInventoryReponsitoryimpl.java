package Backend.DataLayer;

import Entity.ImportInventoty;
import Entity.Products;
import Ultils.JdbcConnection;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ImportInventoryReponsitoryimpl implements IImportInventoryReponsitory {

    @Override
    public boolean createImportInventory(ImportInventoty importInventoty) {
        String CREATE_NEW_INVENTORY = "INSERT INTO import_inventory (quantity,price, create_by, note, product_id ) VALUES (?,?,?,?,?)";
        Connection conn = null;
        PreparedStatement pstmt = null;
        try {
            conn = JdbcConnection.getConnection();
            pstmt = conn.prepareStatement(CREATE_NEW_INVENTORY);
            pstmt.setInt(1, importInventoty.getQuantity());
            pstmt.setDouble(2, importInventoty.getPrice());
            pstmt.setInt(3, importInventoty.getCreateBy());
            pstmt.setString(4, importInventoty.getNote());
            pstmt.setInt(5, importInventoty.getProducts().getProductId());
            return pstmt.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<ImportInventoty> getImportInventories(String sql, Map<Integer, Products> mapPorducts) {

        List<ImportInventoty> importInventories = new ArrayList<>();
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try {
            conn = JdbcConnection.getConnection();
            pstmt = conn.prepareStatement(sql);
            rs = pstmt.executeQuery();
            while (rs.next()) {
                ImportInventoty importInventoty = new ImportInventoty();
                importInventoty.setId(rs.getInt("id"));
                importInventoty.setQuantity(rs.getInt("quantity"));
                importInventoty.setDate(rs.getTimestamp("date"));
                importInventoty.setCreateBy(rs.getInt("create_by"));
                importInventoty.setPrice(rs.getDouble("price"));
                int productId = rs.getInt("product_id");
                Products products = mapPorducts.get(productId);
                importInventoty.setProducts(products);
                importInventories.add(importInventoty);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return importInventories;
    }
}
