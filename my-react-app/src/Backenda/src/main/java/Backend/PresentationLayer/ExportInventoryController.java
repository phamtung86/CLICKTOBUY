package Backend.PresentationLayer;

import Backend.BusinessLayer.ExportInventoryServicesImpl;
import Backend.BusinessLayer.IExportInventoryServices;
import Backend.BusinessLayer.IProductServices;
import Backend.BusinessLayer.ProductServicesimpl;
import Entity.ExportInventory;
import Entity.ImportInventoty;
import Entity.Products;
import com.google.gson.Gson;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@WebServlet("/api/ExportInventories/*")
public class ExportInventoryController extends HttpServlet {
    private IExportInventoryServices iExportInventoryServices;
    public Gson gson = new Gson();
    public ExportInventoryController() {
        iExportInventoryServices = new ExportInventoryServicesImpl();
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json; charset=UTF-8");
        String pathInfo = req.getPathInfo();
        try {
            if (pathInfo == null || pathInfo.equals("/")) {
                resp.sendError(HttpServletResponse.SC_NOT_FOUND);
            } else {
                StringBuilder stringBuilder = new StringBuilder();
                String line;
                try (BufferedReader reader = req.getReader()) {
                    while ((line = reader.readLine()) != null) {
                        stringBuilder.append(line);
                    }
                }
                switch (pathInfo) {
                    case "/ExportInventories":
                        String type = req.getParameter("type");
                        List<ExportInventory> exportInventories = iExportInventoryServices.getExportInventories(type);
                        resp.getWriter().write(gson.toJson(exportInventories));
                }
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String path = req.getPathInfo();

        try {
            if (path == null || path.equals("/")) {
                resp.sendError(HttpServletResponse.SC_NOT_FOUND);
                return;
            }
            boolean allInsert = true;
            StringBuilder jsonString = new StringBuilder();
            String line;
            try (BufferedReader reader = req.getReader()) {
                while ((line = reader.readLine()) != null) {
                    jsonString.append(line);
                }
            }
            switch (path) {
                case "/ExportInventory":
                    JSONObject obj = new JSONObject(jsonString.toString());
                    JSONObject dataOrderObj = obj.getJSONObject("dataOrder");
                    JSONArray jsonArray = new JSONArray(obj.getJSONArray("dataProduct"));
                    int orderId = dataOrderObj.getInt("OrderID");
                    JSONObject orderObj = dataOrderObj.getJSONObject("order");
                    JSONObject userObj = orderObj.getJSONObject("users");
                    int idUserOrder = userObj.getInt("userID");
                    for (int i = 0; i < jsonArray.length(); i++) {
                        JSONObject jsonObject = jsonArray.getJSONObject(i);
                        if(jsonObject.has("product")) {
                            JSONObject product = jsonObject.getJSONObject("product");
                            int productID = product.getInt("productId");
                            double price = product.getDouble("productPrice");
                            String note = product.getString("productNote");
                            boolean check  = iExportInventoryServices.insertExportInventory(price,note,15,idUserOrder,productID,orderId);
                            if(!check) {
                                allInsert = false;
                            }
                        }
                    }
                    resp.getWriter().write(gson.toJson(allInsert));
                    break;

                default:
                    resp.sendError(HttpServletResponse.SC_NOT_FOUND, "Không tìm thấy đường dẫn yêu cầu.");
            }
        } catch (IOException | NumberFormatException e) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Định dạng đầu vào không hợp lệ.");
            e.printStackTrace();
        } catch (JSONException e) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Dữ liệu JSON không hợp lệ.");
            e.printStackTrace();
        }
    }
}
