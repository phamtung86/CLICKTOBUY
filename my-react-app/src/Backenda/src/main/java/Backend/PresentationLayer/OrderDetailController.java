package Backend.PresentationLayer;

import Backend.BusinessLayer.IOrderDetailServices;
import Backend.BusinessLayer.IOrderServices;
import Backend.BusinessLayer.OrderDetailServicesimpl;
import Backend.BusinessLayer.OrderServicesimpl;
import Entity.OrderDetail;
import Entity.Products;
import com.google.gson.Gson;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/api/OrdersDetail/*")
public class OrderDetailController extends HttpServlet {
    private final IOrderServices iOrderServices = new OrderServicesimpl();
    public IOrderDetailServices iOrderDetailServices;
    private final Gson gson = new Gson();

    public OrderDetailController() {
        iOrderDetailServices = new OrderDetailServicesimpl();
    }

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
                case "/getTopSelling":
                    String typeTopSellingProduct = req.getParameter("type");
                    ArrayList<OrderDetail> listOrderDetails = new ArrayList<>();
                    listOrderDetails = iOrderDetailServices.getTopSellingProducts(typeTopSellingProduct);
                    resp.getWriter().write(gson.toJson(listOrderDetails));
                    break;
                case "/getTotalSelled":
                    String type = req.getParameter("type");
                    int totalSellDay = iOrderDetailServices.getTotalSelled(type);
                    resp.getWriter().write(gson.toJson(totalSellDay));
                    break;
            }
        } catch (Exception e) {
            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        try {
            if (pathInfo.equals("/") || pathInfo == null) {
                resp.sendError(HttpServletResponse.SC_NOT_FOUND);
                return;
            } else {
                StringBuilder jsonString = new StringBuilder();
                String line;
                try (BufferedReader reader = req.getReader()) {
                    while ((line = reader.readLine()) != null) {
                        jsonString.append(line);
                    }
                }
                switch (pathInfo) {
                    case "/InsertOrderDetail":
                        JSONObject obj = new JSONObject(jsonString.toString());

                        // Kiểm tra xem "value" có phải là JSONArray hay không
                        if (obj.has("value") && obj.get("value") instanceof org.json.JSONArray) {
                            org.json.JSONArray orderDetailArray = obj.getJSONArray("value");

                            // Duyệt qua mảng các sản phẩm
                            ArrayList<Products> listProducts = new ArrayList<>();
                            ArrayList<OrderDetail> listOrderDetails = new ArrayList<>();
                            int orderID = iOrderServices.getLastOrderID();
                            for (int i = 0; i < orderDetailArray.length(); i++) {
                                JSONObject productObj = orderDetailArray.getJSONObject(i);

                                // Lấy thông tin từng sản phẩm từ JSONObject
                                int id = productObj.getInt("id");
                                String image = productObj.getString("Image");
                                String name = productObj.getString("name");
                                String unit = productObj.getString("unit");
                                double price = productObj.getDouble("price");
                                double priceSale = productObj.getDouble("priceSale");
                                int sale = productObj.getInt("sale");
                                int quantity = productObj.getInt("quantity");

                                // Khởi tạo sản phẩm và thêm vào danh sách
                                Products product = new Products(id, name, price, null, "", unit, sale, image, null);
                                listProducts.add(product);
                                OrderDetail orderDetail = new OrderDetail(id, price, quantity, product, orderID);
                                listOrderDetails.add(orderDetail);
                            }
                            for (OrderDetail orderDetail : listOrderDetails) {
                                iOrderDetailServices.insertOrderDetail(orderDetail.getPrice(), orderDetail.getQuantity(), orderDetail.getProduct().getProductId(), orderDetail.getOrderID());
                            }
                        } else {
                            // Trường hợp "value" không phải là JSONArray
                            System.out.println("Error: 'value' is not a JSONArray");
                        }
                        break;
                }
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }
}
