package Servlet;

import Entity.ProductDetail;
import Entity.Products;
import com.google.gson.Gson;
import controller.ProductDetailController;
import controller.Productcontroller;
import org.json.JSONException;
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

@WebServlet("/api/ProductDetail")
public class ProductDetailServlet extends HttpServlet {
    private final ProductDetailController productDetailController = new ProductDetailController();
    private final Productcontroller productController = new Productcontroller();
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        try {
            // Lấy tham số từ URL
            String productIdParam = request.getParameter("Code");
            if (productIdParam != null && !productIdParam.isEmpty()) {
                int productId = Integer.parseInt(productIdParam);

                // Lấy danh sách sản phẩm và chi tiết sản phẩm
                ArrayList<Products> listProducts = (ArrayList<Products>) productController.getAllListProduct();
                ArrayList<ProductDetail> listProductDetail = productDetailController.getListAllProductDetail(listProducts);

                // Tìm chi tiết sản phẩm theo ID
                ProductDetail productDetail = productDetailController.getProductDetailFromProductId(listProductDetail, productId);

                if (productDetail != null) {
                    // Trả về chi tiết sản phẩm dưới dạng JSON
                    response.getWriter().write(gson.toJson(productDetail));
                } else {
                    response.sendError(HttpServletResponse.SC_NOT_FOUND, "Product not found");
                }
            } else {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Product ID is required");
            }
        } catch (NumberFormatException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid Product ID format");
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Server Error: " + e.getMessage());
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
                JSONObject jsonObject = new JSONObject(jsonString.toString());
                switch (pathInfo) {
                    case "/InsertProductDetail":
                       String origin = jsonObject.getString("productOrigin");
                       String ingredient = jsonObject.getString("productIngredient");
                       String instruction = jsonObject.getString("productInstruction");
                       String preserve = jsonObject.getString("productPreseve");
                       String discription = jsonObject.getString("productDescription");
                       String expiryDate = jsonObject.getString("productExpiry");
                       String productDetailNote = jsonObject.getString("productDetailNote");
                       int productId = jsonObject.getInt("productId");
                       ProductDetail productDetail = new ProductDetail(origin,ingredient,instruction,preserve,discription,expiryDate,productDetailNote);
                        boolean isInserted = productDetailController.insertProductDetail(productDetail,productId);
                        resp.getWriter().write(gson.toJson(isInserted));
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
