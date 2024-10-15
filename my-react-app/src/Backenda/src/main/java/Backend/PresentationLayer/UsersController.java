package Backend.PresentationLayer;

import Backend.BusinessLayer.IUserServices;
import Backend.BusinessLayer.UserServicesimpl;
import Entity.Products;
import Entity.Users;
import com.google.gson.Gson;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/api/Users/*")
public class UsersController extends HttpServlet {
    private IUserServices iUserServices;

    public UsersController() {
        iUserServices = new UserServicesimpl();
    }

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
                case "/getAllUser":
                    try {
                        ArrayList<Users> listUsers = iUserServices.getAllUsers();
                        resp.getWriter().write(gson.toJson(listUsers));
                    } catch (Exception e) {
                        e.printStackTrace();
                        resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "An error occurred while processing the request.");
                    }
                    break;
                case "/getQuantityUser":
                    int totalQuantityUser = iUserServices.getQuantityUser();
                    resp.getWriter().write(gson.toJson(totalQuantityUser));
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
        String pathInfo = req.getPathInfo();

        try {
            if (pathInfo == null || pathInfo.equals("/")) {
                resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing action");
                return;
            }
            // Đọc dữ liệu JSON từ yêu cầu
            StringBuilder jsonString = new StringBuilder();
            String line;
            try (BufferedReader reader = req.getReader()) {
                while ((line = reader.readLine()) != null) {
                    jsonString.append(line);
                }
            }

            // Chuyển đổi dữ liệu JSON thành đối tượng
            JSONObject jsonObject = new JSONObject(jsonString.toString());

            switch (pathInfo) {

                case "/insertRegister":
                    JSONObject valueObject = jsonObject.getJSONObject("value");
                    Users newUser = gson.fromJson(valueObject.toString(), Users.class);
                    iUserServices.insertUser(newUser); // Thực hiện chèn người dùng
                    break;

                case "/postPhoneNumber":
                    String phoneNumber = jsonObject.getString("value");
                    Users user = iUserServices.getInfoFromPhoneNumber(phoneNumber);

                    resp.setContentType("application/json");
                    if (user != null) {
                        resp.getWriter().write(gson.toJson(user));
                    } else {
                        resp.sendError(HttpServletResponse.SC_NOT_FOUND, "No user found with the given phone number.");
                    }
                    break;

                case "/getIDFromUsername":
                    String username = jsonObject.getString("value");
                    int id = iUserServices.getIdFromUserName(username);
                    resp.setContentType("application/json");
                    if (id != -1) {
                        resp.getWriter().write(gson.toJson(id));
                    } else {
                        resp.sendError(HttpServletResponse.SC_NOT_FOUND, "No user found with the given username.");
                    }

                default:
                    resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid action.");
                    break;
            }
        } catch (Exception e) {
            e.printStackTrace();
            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "An error occurred while processing the request.");
        }
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        try {
            if (pathInfo == null || pathInfo.equals("/")) {
                resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing action");
                return;
            }
            // Đọc dữ liệu JSON từ yêu cầu
            StringBuilder jsonString = new StringBuilder();
            String line;
            try (BufferedReader reader = req.getReader()) {
                while ((line = reader.readLine()) != null) {
                    jsonString.append(line);
                }
            }
            switch (pathInfo) {
                case "/updateStatusUser":
                    int status = Integer.parseInt(req.getParameter("status"));
                    int userID = Integer.parseInt(req.getParameter("userID"));
                    boolean reponseResult = iUserServices.updateStatusUser(userID,status);
                    if (reponseResult) {
                        resp.setStatus(HttpServletResponse.SC_OK);
                    }
                    break;
                default:
                    resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid action.");
                    break;
            }
        } catch (Exception e) {
            e.printStackTrace();
            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "An error occurred while processing the request.");
        }
    }
}
