package Servlet;

import com.google.gson.Gson;
import controller.UsersController;
import Entity.Users;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;

import org.json.JSONObject;

@WebServlet("/api/Users/*")
public class UsersServlet extends HttpServlet {
    private final UsersController usersController = new UsersController();
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getRequestURI();
        resp.setContentType("application/json");

        if (pathInfo == null || pathInfo.equals("/api/Users")) {
            try {
                ArrayList<Users> listUsers = usersController.getAllUsers();
                resp.getWriter().write(gson.toJson(listUsers));
            } catch (Exception e) {
                e.printStackTrace();
                resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "An error occurred while processing the request.");
            }
        } else {
            resp.sendError(HttpServletResponse.SC_NOT_FOUND, "Path not found");
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
                    usersController.addUser(newUser); // Thực hiện chèn người dùng
                    break;

                case "/postPhoneNumber":
                    String phoneNumber = jsonObject.getString("value");
                    Users user = usersController.getInfoFromPhoneNumber(phoneNumber);

                    resp.setContentType("application/json");
                    if (user != null) {
                        resp.getWriter().write(gson.toJson(user));
                    } else {
                        resp.sendError(HttpServletResponse.SC_NOT_FOUND, "No user found with the given phone number.");
                    }
                    break;

                case "/getIDFromUsername":
                    String username = jsonObject.getString("value");
                    int id = usersController.getIDFromUsername(username);
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
}
