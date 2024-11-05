package Backend.PresentationLayer;

import Backend.BusinessLayer.IImportInventoryServices;
import Backend.BusinessLayer.IProductServices;
import Backend.BusinessLayer.ImportInventoryServicesimpl;
import Backend.BusinessLayer.ProductServicesimpl;
import Entity.ImportInventoty;
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
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@WebServlet("/api/ImportInventorys/*")
public class ImportInventoryController extends HttpServlet {
    public Gson gson = new Gson();
    private IImportInventoryServices iImportInventoryServices;

    public ImportInventoryController() {
        iImportInventoryServices = new ImportInventoryServicesimpl();
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
                    case "/importInventorys":
                        String type = req.getParameter("type");
                        List<ImportInventoty> importInventotities = iImportInventoryServices.getImportInventories(type);
                        resp.getWriter().write(gson.toJson(importInventotities));
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
                    case "/importInventorys":
                        IProductServices iProductServices = new ProductServicesimpl();
                        JSONObject jsonObject = new JSONObject(stringBuilder.toString());
                        Map<Integer, Products> mapProducts = iProductServices.getProductsMap();
                        int quantity = jsonObject.getInt("quantity");
                        double price = jsonObject.getDouble("price");
                        int createBy = jsonObject.getInt("createBy");
                        String note = jsonObject.getString("note");
                        int productId = jsonObject.getInt("productId");
                        Products products = mapProducts.get(productId);
                        ImportInventoty importInventoty = new ImportInventoty(quantity, price, createBy, note, products);
                        boolean checkInsert = iImportInventoryServices.createImportInventory(importInventoty);
                        resp.getWriter().write(gson.toJson(checkInsert));
                }
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }
}
