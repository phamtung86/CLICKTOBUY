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
import java.io.IOException;
import java.util.ArrayList;

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

}
