package controller;
import modal.Categories;
import java.sql.*;

import java.util.ArrayList;

public class main {
    static ArrayList<Categories> listCt = new ArrayList<>();


    static final String URL =  "jdbc:mysql: //localhost:3306/book";
    static final String USER = "root";
    static final String PASS = "root";
    public static void main(String[] args) {
        ArrayList<modal.Products> listPt = new ArrayList<>();
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection(URL,USER,PASS);
            Statement stmt = con.createStatement();
            ResultSet rs = stmt.executeQuery("select * from categories");
            while (rs.next()) {
                listCt.add(new Categories(rs.getInt("CategoryId"),rs.getString("CategoryName"),rs.getDate("CreatedAt")));
            }
            ResultSet rd = stmt.executeQuery("select * from products");
            while (rd.next()) {
                modal.Products product = new modal.Products(
                        rd.getInt("ProductID"),
                        rd.getString("ProductName"),
                        rd.getString("Description"),
                        rd.getDouble("Price"),
                        rd.getInt("Stock"),
                        rd.getTimestamp("CreatedAt"),
                        rd.getString("Note"),
                        rd.getString("Unit"),
                        rd.getInt("Discount"),
                        rd.getString("ImageLink"),
                        rd.getInt("CategoryID")
                );
                listPt.add(product);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }

        for (Categories p : listCt) {
            System.out.println(p.toString());
        }

    }
}