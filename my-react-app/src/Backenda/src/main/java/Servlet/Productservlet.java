package Servlet;

import com.google.gson.Gson;
import controller.Productcontroller;
import Entity.Products;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
@WebServlet("/api/Products/*")
public class Productservlet extends HttpServlet {
    private final Productcontroller productcontroller = new Productcontroller();
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getRequestURI();
        resp.setContentType("application/json");

        try {
            if (pathInfo.equals("/api/Products")) {
                List<Products> listProductsSale = productcontroller.getAllListProduct();
                resp.getWriter().write(gson.toJson(listProductsSale));
            }  else {
                resp.sendError(HttpServletResponse.SC_NOT_FOUND, "Path not found");
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
