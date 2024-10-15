package Backend.PresentationLayer;

import Backend.BusinessLayer.CategoriesServices;
import Backend.BusinessLayer.ICategoriesServices;
import Entity.Categories;
import Entity.Products;
import Backend.BusinessLayer.IProductServices;
import Backend.BusinessLayer.ProductServicesimpl;
import com.google.gson.Gson;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
@WebServlet("/api/Products/*")
public class Productcontroller extends HttpServlet {
    private final IProductServices iProductServices;
    private final ICategoriesServices iCategoriesServices;

    public Productcontroller() {
        iCategoriesServices = new CategoriesServices();
        iProductServices = new ProductServicesimpl();
    }

    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        resp.setContentType("application/json");

        try {
            if (pathInfo == null || pathInfo.equals("/")) {
                resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing action");
                return;
            }

            switch (pathInfo) {
                case "/getDataProducts":
                    List<Products> listProducts = iProductServices.getAllListProduct();
                    resp.getWriter().write(gson.toJson(listProducts));
                    break;

                case "/getDataProductsSale":
                    List<Products> listProductsSale = iProductServices.getListProductSale();
                    resp.getWriter().write(gson.toJson(listProductsSale));
                    break;
                case "/getDataProductsType":
                    int id = Integer.parseInt(req.getParameter("CategoryID"));
                    List<Products> listProductsType = iProductServices.getListProductType(id);
                    resp.getWriter().write(gson.toJson(listProductsType));
                    break;

                default:
                    resp.sendError(HttpServletResponse.SC_NOT_FOUND, "Action not found");
                    break;
            }
        } catch (Exception e) {
            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        resp.setContentType("application/json");
        try {
            if (pathInfo == null || pathInfo.equals("/")) {
                resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing action");
            } else {
                BufferedReader reader = req.getReader();
                StringBuilder jsonString = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    jsonString.append(line);
                }
                switch (pathInfo) {
                    case "/InsertProduct":
                        JSONObject jsonObject = new JSONObject(jsonString.toString());
                        int productId = jsonObject.getInt("productId");
                        String ImageLink = jsonObject.getString("productImage");
                        String Name = jsonObject.getString("productName");
                        double Price = jsonObject.getDouble("productPrice");
                        Timestamp timestamp = new Timestamp(new Date().getTime());
                        String Note = jsonObject.getString("productNote");
                        String Unit = jsonObject.getString("productUnit");
                        int Discount = jsonObject.getInt("productDiscount");
                        int categoryID = jsonObject.getInt("productCategoryId");
                        Products p = new Products(productId, Name, Price, timestamp, Note, Unit, Discount, ImageLink, null);
                        boolean isInsert = iProductServices.insertProduct(p, categoryID);
                        break;
                    case "/getDataProductsSearch":
                        String productName = req.getParameter("productName");
                        List<Products> listResultProductsSearchByName = iProductServices.listProductSearchByName(productName);
                        resp.getWriter().write(gson.toJson(listResultProductsSearchByName));
                        break;

                }
            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (NumberFormatException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        resp.setContentType("application/json");
        try {
            if (pathInfo == null || pathInfo.equals("/")) {
                resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing action");
            } else {
                BufferedReader reader = req.getReader();
                StringBuilder jsonString = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    jsonString.append(line);
                }
                JSONObject jsonObject = new JSONObject(jsonString.toString());
                switch (pathInfo) {
                    case "/updateProduct":
                        // Đọc dữ liệu từ JSONObject
                        int id = jsonObject.getInt("productId");
                        String productImageLink = jsonObject.getString("productImage");
                        String productName = jsonObject.getString("productName");
                        double productPrice = jsonObject.getDouble("productPrice");
                        String productNote = jsonObject.getString("productNote");
                        String productUnit = jsonObject.getString("productUnit");
                        int productDiscount = jsonObject.getInt("productDiscount");
                        int categoryId = jsonObject.getInt("categoryID");

                        // Lấy danh sách các category từ controller (hoặc nguồn dữ liệu của bạn)
                        Map<Integer, Categories> categoriesMap = iCategoriesServices.getMapCategories();
                        Categories category = categoriesMap.get(categoryId);

                        // Tạo đối tượng Product và gọi phương thức để cập nhật vào cơ sở dữ liệu
                        Products product = new Products(id, productName, productPrice, new Date(), productNote, productUnit, productDiscount, productImageLink, category);

                        // Giả sử bạn có phương thức updateProduct trong ProductsController để cập nhật sản phẩm
                        boolean isUpdated = iProductServices.modifyProduct(product);
                        break;
                }
            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (NumberFormatException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        resp.setContentType("application/json");
        try {
            if (pathInfo == null || pathInfo.equals("/")) {
                resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing action");
            } else {
                BufferedReader reader = req.getReader();
                StringBuilder jsonString = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    jsonString.append(line);
                }
                switch (pathInfo) {
                    case "/DeleteProduct":
                        int id = Integer.parseInt(req.getParameter("ID"));
                        boolean isDeleted = iProductServices.deleteProduct(id);
                        break;
                }
            }

        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (NumberFormatException e) {
            throw new RuntimeException(e);
        }
    }
}

