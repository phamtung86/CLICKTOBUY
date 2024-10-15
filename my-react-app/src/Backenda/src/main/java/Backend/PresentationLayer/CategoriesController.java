package Backend.PresentationLayer;

import Entity.Categories;
import Backend.BusinessLayer.CategoriesServices;
import Backend.BusinessLayer.ICategoriesServices;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;
@WebServlet("/api/Categories/*")
public class CategoriesController extends HttpServlet {
    public ICategoriesServices iCategoriesServices;
    private Gson gson = new Gson();
    public CategoriesController() {
        iCategoriesServices = new CategoriesServices();
    }
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getRequestURI();
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        try{
            if(pathInfo.equals("/api/Categories")){
                ArrayList<Categories> listDataCategories = iCategoriesServices.getListAllCategories();
                resp.getWriter().write(gson.toJson(listDataCategories));
            } else {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
