package Backend.PresentationLayer;

import Backend.BusinessLayer.IOrderServices;
import Backend.BusinessLayer.OrderServicesimpl;
import Entity.Order;
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
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/api/Orders/*")
public class OrderController extends HttpServlet {
    private final Gson gson = new Gson();
    private IOrderServices iOrderServices;

    public OrderController() {
        iOrderServices = new OrderServicesimpl();
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
                case "/getTopUserOrder":
                    String typeOrder = req.getParameter("type");
                    ArrayList<Order> listUserOrder = iOrderServices.getListTopUserOrders(typeOrder);
                    resp.getWriter().write(gson.toJson(listUserOrder));
                    break;
                case "/getTotalRevenue":
                    String type = req.getParameter("type");
                    if (type == null || type.isEmpty()) {
                        resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing or empty 'type' parameter");
                        return;
                    }
                    double revenueDay = iOrderServices.getTotalRevenue(type);
                    resp.getWriter().write(gson.toJson(revenueDay));
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
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String pathInfo = request.getPathInfo();
        try {
            if (pathInfo == null || pathInfo.equals("/")) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing action");
                return;
            }
            // Đọc dữ liệu JSON từ yêu cầu
            StringBuilder jsonString = new StringBuilder();
            String line;
            try (BufferedReader reader = request.getReader()) {
                while ((line = reader.readLine()) != null) {
                    jsonString.append(line);
                }
            }

            switch (pathInfo) {
                case "/InsertOrders":
                    JSONObject jsonObject = new JSONObject(jsonString.toString());
                    JSONObject valueObject = jsonObject.getJSONObject("value");
                    Integer userID = valueObject.has("userID") ?
                            (valueObject.get("userID").toString().equals("null") ? null : valueObject.getInt("userID")) : null;
                    Integer voucherID = valueObject.has("voucherID") ?
                            (valueObject.get("voucherID").toString().equals("null") ? null : valueObject.getInt("voucherID")) : null;
                    Order order = gson.fromJson(valueObject.toString(), Order.class);
                    iOrderServices.insertOrder(order, userID, voucherID);
                    break;

                default:
                    response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid action.");
                    break;
            }
        } catch (IOException | JSONException e) {
            throw new RuntimeException(e);
        }
    }
}
