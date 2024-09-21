package Reponsitory;

import Entity.ProductDetail;
import Entity.Products;
import Ultils.JdbcConnection;

import java.sql.*;
import java.util.ArrayList;

public class ProductDetailReponsitoryimpl implements IProductDetailReponsitory {
    @Override
    public ArrayList<ProductDetail> getListAllProductDetail(ArrayList<Products> listProducts) {
        ArrayList<ProductDetail> listProductDetail = new ArrayList<>();
        String SELECT_ALL_PRODUCT_DETAIL = "SELECT * FROM product_detail";
        Connection con = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            con = JdbcConnection.getConnection();
            ps = con.prepareStatement(SELECT_ALL_PRODUCT_DETAIL);
            rs = ps.executeQuery();
            while (rs.next()) {
                int id = rs.getInt("id");
                String origin = rs.getString("origin");
                String ingredient = rs.getString("ingredient");
                String intruction = rs.getString("intruction");
                String preserve = rs.getString("preserve");
                String description = rs.getString("description");
                Timestamp productDate = rs.getTimestamp("production_date");
                String expiry = rs.getString("expiry");
                String note = rs.getString("Note");
                int productID = rs.getInt("productID");
                Products p = null;
                for (Products products : listProducts) {
                    if (productID == products.getProductId()) {
                        p = products;
                    }
                }
                ProductDetail productDetail = new ProductDetail(id, origin, ingredient, intruction, preserve, description, productDate, expiry, note, p);
                listProductDetail.add(productDetail);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JdbcConnection.closeConnection(con, ps, rs);
        }
        return listProductDetail;
    }

    @Override
    public ProductDetail getProductDetailFromProductId(ArrayList<ProductDetail> listProductDetail, int id) {
        for (ProductDetail productDetail : listProductDetail) {
            if(id == productDetail.getProducts().getProductId()){
                return productDetail;
            }
        }
        return null;
    }

    @Override
    public boolean insertProductDetail(ProductDetail productDetail, int productID) {
        String INSERT_PRODUCTDETAIL_SQL = "INSERT INTO product_detail (origin,ingredient,intruction, preserve,description,expiry,Note,productID) VALUES (?,?,?,?,?,?,?,?)";
        Connection con = null;
        PreparedStatement ps = null;
        try {
            con = JdbcConnection.getConnection();
            ps = con.prepareStatement(INSERT_PRODUCTDETAIL_SQL);
            ps.setString(1, productDetail.getOrigin());
            ps.setString(2,productDetail.getIgredient());
            ps.setString(3,productDetail.getInstruction());
            ps.setString(4,productDetail.getPreserve());
            ps.setString(5,productDetail.getDescription());
            ps.setString(6,productDetail.getExpiry());
            ps.setString(7,productDetail.getNote());
            ps.setInt(8,productID);
            int count = ps.executeUpdate();
            return count > 0;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JdbcConnection.closeConnection(con, ps, null);
        }
    }


}
