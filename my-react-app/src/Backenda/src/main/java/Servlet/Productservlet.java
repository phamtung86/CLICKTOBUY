package Servlet;

import com.google.gson.Gson;
import controller.Productcontroller;
import Entity.Products;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;

@WebServlet("/api/Products/*")
public class Productservlet extends HttpServlet {
    private final Productcontroller productcontroller = new Productcontroller();
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
                    List<Products> listProducts = productcontroller.getAllListProduct();
                    resp.getWriter().write(gson.toJson(listProducts));
                    break;

                case "/getDataProductsSale":
                    List<Products> listProductsSale = productcontroller.getListProductSale();
                    resp.getWriter().write(gson.toJson(listProductsSale));
                    break;
                case "/getDataProductsMilk":
                    List<Products> listProductsMilk = productcontroller.getListProductMilk();
                    resp.getWriter().write(gson.toJson(listProductsMilk));
                    break;
                case "/getDataProductsVegetable":
                    List<Products> listProductsVegetable = productcontroller.getListProductVegetable();
                    resp.getWriter().write(gson.toJson(listProductsVegetable));
                    break;
                case "/getDataProductsCleanChemical":
                    List<Products> listProductsCleanChemical = productcontroller.getListProductCleanChemical();
                    resp.getWriter().write(gson.toJson(listProductsCleanChemical));
                    break;
                case "/getDataProductsTakeCare":
                    List<Products> listProductsTakeCare = productcontroller.getListProductTakeCare();
                    resp.getWriter().write(gson.toJson(listProductsTakeCare));
                    break;
                    case "/getDataProductsSearch":
                        String productName = req.getParameter("productName");
                        List<Products> listResultProductsSearchByName = productcontroller.listProductSearchByName(productName);
                        resp.getWriter().write(gson.toJson(listResultProductsSearchByName));
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
        StringBuilder jsonString = new StringBuilder();
        String line;
        try (BufferedReader reader = req.getReader()) {
            while ((line = reader.readLine()) != null) {
                jsonString.append(line);
            }
        }
    }
}
