package Backend.DataLayer;

import Entity.Categories;
import Ultils.JdbcConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class CategoriesReponsitoryimpl implements ICategoriesReponsitory {
    @Override
    public ArrayList<Categories> getListAllCategories() {
        ArrayList<Categories> listDataCategories = new ArrayList<>();
        String SQL = "select * from categories";
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            connection = JdbcConnection.getConnection();
            preparedStatement = connection.prepareStatement(SQL);
            resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                Categories categories = new Categories(
                        resultSet.getInt("CategoryID"),
                        resultSet.getString("CategoryName"),
                        resultSet.getDate("CreatedAt"),
                        resultSet.getString("CategoryImageLink"),
                        resultSet.getString("CategoryNameEng")
                );
                listDataCategories.add(categories);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JdbcConnection.closeConnection(connection, preparedStatement, resultSet);
        }
        return listDataCategories;
    }

    @Override
    public Map<Integer, Categories> getMapCategories() {
        Map<Integer, Categories> categoriesMap = new HashMap<Integer, Categories>();
        String SELECT_ALL_CATEGORY = "SELECT * FROM categories";
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            Connection con = JdbcConnection.getConnection();
            PreparedStatement psCategories = con.prepareStatement(SELECT_ALL_CATEGORY);
            ResultSet rsCategories = psCategories.executeQuery();
            while (rsCategories.next()) {
                Categories categories = new Categories(
                        rsCategories.getInt("CategoryID"),
                        rsCategories.getString("CategoryName"),
                        rsCategories.getDate("CreatedAt"),
                        rsCategories.getString("CategoryImageLink"),
                        rsCategories.getString("CategoryNameEng")

                );
                categoriesMap.put(categories.getCategoryId(), categories);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            JdbcConnection.closeConnection(connection, preparedStatement, resultSet);
        }
        return categoriesMap;
    }
}
