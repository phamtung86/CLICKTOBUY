package Servlet;

import Entity.Categories;
import com.google.gson.Gson;
import Backend.PresentationLayer.CategoriesController;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet("/api/Categories/*")
public class CategoriesServlet extends HttpServlet {
    private static final CategoriesController categoriesController = new CategoriesController();
    private Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getRequestURI();
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        try{
            if(pathInfo.equals("/api/Categories")){
                ArrayList<Categories> listDataCategories = categoriesController.getListAllCategories();
                resp.getWriter().write(gson.toJson(listDataCategories));
            } else {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
