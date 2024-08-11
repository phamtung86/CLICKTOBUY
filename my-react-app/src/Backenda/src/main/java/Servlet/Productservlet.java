package Servlet;

import Services.Productservice;
import com.google.gson.Gson;
import controller.Productcontroller;
import modal.Products;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

public class Productservlet extends HttpServlet {
    private final Productservice productservice = new Productservice();
    private final Productcontroller productcontroller = new Productcontroller(productservice);
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        resp.setContentType("application/json");

        try {
            if (pathInfo == null || pathInfo.equals("/")) {
                List<Products> listProductsSale = productcontroller.getAllProductsSale();
                resp.getWriter().write(gson.toJson(listProductsSale));
            }  else {
                resp.sendError(HttpServletResponse.SC_NOT_FOUND, "Path not found");
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
