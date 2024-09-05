package Servlet;

import com.google.gson.Gson;
import controller.OrderController;
import Entity.Order;
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

@WebServlet("/api/Orders/*")
public class OrderServlet extends HttpServlet {
    private final OrderController orderController = new OrderController();
    private final Gson gson = new Gson();
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String path = request.getRequestURI();
        if (path.equals("/api/Orders")) {
            try {
                StringBuilder jsonString = new StringBuilder();
                String line;
                try (BufferedReader reader = request.getReader()) {
                    while ((line = reader.readLine()) != null) {
                        jsonString.append(line);
                    }
                }
                JSONObject jsonObject = new JSONObject(jsonString.toString());
                String action = jsonObject.getString("action");

                switch (action) {
                    case "insertOrders":
                        JSONObject valueObject = jsonObject.getJSONObject("value");
                        Integer userID = valueObject.has("userID") ?
                                (valueObject.get("userID").toString().equals("null") ? null : valueObject.getInt("userID")) : null;
                        Integer voucherID = valueObject.has("voucherID") ?
                                (valueObject.get("voucherID").toString().equals("null") ? null : valueObject.getInt("voucherID")) : null;
                        Order order = gson.fromJson(valueObject.toString(), Order.class);
                        orderController.insertOrder(order, userID, voucherID);
                        break;
                    default:
                        response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid action.");
                        break;
                }
            } catch (IOException | JSONException | SQLException e) {
                throw new RuntimeException(e);
            }
        }
    }

}
