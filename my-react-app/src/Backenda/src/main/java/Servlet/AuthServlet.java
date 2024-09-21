package Servlet;

import Entity.Users;
import com.google.gson.Gson;
import controller.AuthController;
import controller.UsersController;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet("/api/Auth/*")
public class AuthServlet extends HttpServlet {
    private final AuthController authController = new AuthController();
    private final Gson gson = new Gson();
    private final UsersController usersController = new UsersController();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        resp.setContentType("application/json;charset=UTF-8");
        resp.setCharacterEncoding("UTF-8");
        if (pathInfo == null || pathInfo.equals("/")) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing action");
            return;
        }

        try (BufferedReader reader = req.getReader()) {
            StringBuilder jsonString = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                jsonString.append(line);
            }
            JSONObject jsonObject = new JSONObject(jsonString.toString());

            switch (pathInfo) {
                case "/Login":
                    String username = jsonObject.getString("username");
                    String password = jsonObject.getString("password");

                    if (username.isEmpty() || password.isEmpty()) {
                        resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Username and password are required");
                        return;
                    }

                    ArrayList<Users> listDataUsers = usersController.getAllUsers();
                    String token = authController.authAccount(username, password, listDataUsers);

                    if (token == null || token.isEmpty()) {
                        resp.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid username or password");
                        return;
                    }

                    JSONObject responseJson = new JSONObject();
                    responseJson.put("token", token);
                    resp.getWriter().write(responseJson.toString());
                    break;

                default:
                    resp.sendError(HttpServletResponse.SC_NOT_FOUND, "Action not found");
            }
        } catch (Exception e) {
            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Internal server error");
            e.printStackTrace();
        }
    }
}
