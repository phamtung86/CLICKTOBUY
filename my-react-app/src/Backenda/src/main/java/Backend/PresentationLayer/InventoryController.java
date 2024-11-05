package Backend.PresentationLayer;

import Backend.BusinessLayer.IInventoryServices;
import Backend.BusinessLayer.IProductServices;
import Backend.BusinessLayer.InventoryServicesimpl;
import Backend.BusinessLayer.ProductServicesimpl;
import Entity.Inventory;
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

@WebServlet("/api/Inventorys/*")
public class InventoryController extends HttpServlet {
    public Gson gson = new Gson();
    private IInventoryServices iInventoryServices;

    public InventoryController() {
        iInventoryServices = new InventoryServicesimpl();
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json; charset=UTF-8"); // Thiết lập mã hóa UTF-8 cho response
        String path = request.getPathInfo();
        try {
            if (path == null || path.equals("/")) {
                response.sendError(HttpServletResponse.SC_NOT_FOUND);
            } else {
                switch (path) {
                    case "/inventorys":
                        IProductServices iProductServices = new ProductServicesimpl();
                        Map <Integer, Products> mapProducts = iProductServices.getProductsMap();
                        List<Inventory> listInventory = iInventoryServices.getAllInventorys(mapProducts);
                        response.getWriter().write(gson.toJson(listInventory));
                        break;
                    case "/OutOfStock":
                        IProductServices ips = new ProductServicesimpl();
                        Map <Integer, Products> mapAllProducts = ips.getProductsMap();
                        List<Inventory> listPreOutOfStock = iInventoryServices.getInventoriresPreOutOfStock(mapAllProducts);
                        response.getWriter().write(gson.toJson(listPreOutOfStock));
                        break;
                        case "/InventorysByProductID":
                            int productID = Integer.parseInt(request.getParameter("productID"));
                            Inventory inventory = iInventoryServices.findInventoryByProductId(productID);
                            response.getWriter().write(gson.toJson(inventory));
                }
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        try {
            if(pathInfo == null || pathInfo.equals("/")) {
                resp.sendError(HttpServletResponse.SC_NOT_FOUND);
                return;
            } else {
                switch (pathInfo) {
                    case "/inventorys":
                        int productId = Integer.parseInt(req.getParameter("productId"));
                        boolean check = iInventoryServices.createInventory(productId);
                        if (check) {
                            resp.getWriter().write(gson.toJson(check));
                        }
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
        resp.setContentType("application/json; charset=UTF-8"); // Thiết lập mã hóa UTF-8 cho response
        String path = req.getPathInfo();

        try {
            if (path == null || path.equals("/")) {
                resp.sendError(HttpServletResponse.SC_NOT_FOUND);
                return;
            }

            StringBuilder jsonString = new StringBuilder();
            String line;
            try (BufferedReader reader = req.getReader()) {
                while ((line = reader.readLine()) != null) {
                    jsonString.append(line);
                }
            }
            switch (path) {
                case "/inventorys":
                    boolean allUpdated = true;
                    String type = req.getParameter("type");
                    if ("EXPORT".equals(type)) {
                        JSONArray jsonArray = new JSONArray(jsonString.toString());
                        for (int i = 0; i < jsonArray.length(); i++) {
                            JSONObject obj = jsonArray.getJSONObject(i);
                            if (obj.has("quantity") && obj.has("product")) {
                                int quantity = obj.getInt("quantity");
                                JSONObject productObj = obj.getJSONObject("product");

                                if (productObj.has("productId")) {
                                    int productID = productObj.getInt("productId");

                                    boolean checkUpdate = false;
                                    checkUpdate = iInventoryServices.updateQuantityAfterImport(-quantity, productID);
                                    if (!checkUpdate) {
                                        allUpdated = false;
                                    }
                                } else {
                                    resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Thiếu 'productId' trong 'product' của một đối tượng.");
                                    return;
                                }
                            } else {
                                resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Thiếu 'quantity' hoặc 'product' trong một hoặc nhiều đối tượng.");
                                return;
                            }
                        }
                    } else {
                        int quantity = Integer.parseInt(req.getParameter("quantity"));
                        int productID = Integer.parseInt(req.getParameter("productID"));
                        boolean checkUpdate = iInventoryServices.updateQuantityAfterImport(quantity, productID);
                        if (!checkUpdate) {
                            allUpdated = false;
                        }
                    }
                    // Trả về kết quả cho client
                    resp.getWriter().write(gson.toJson(allUpdated));
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
