package Reponsitory;

import Entity.Categories;
import Ultils.JdbcConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

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
                        resultSet.getString("CategoryImageLink")
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
}
