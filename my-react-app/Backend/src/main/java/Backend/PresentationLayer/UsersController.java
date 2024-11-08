package Backend.PresentationLayer;

import Backend.BusinessLayer.IOTPServices;
import Backend.BusinessLayer.IUserServices;
import Backend.BusinessLayer.OTPServicesimpl;
import Backend.BusinessLayer.UserServicesimpl;
import Backend.Mail.SendMail;
import Entity.OTP;
import Entity.Products;
import Entity.Users;
import Ultils.JdbcConnection;
import com.google.gson.Gson;
import org.eclipse.jetty.server.session.Session;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Timestamp;
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
            StringBuilder jsonString = new StringBuilder();
            String line;
            try (BufferedReader reader = req.getReader()) {
                while ((line = reader.readLine()) != null) {
                    jsonString.append(line);
                }
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
                case "/getIDFromUsername":
                    JSONObject jsonObject = new JSONObject(jsonString.toString());
                    String username = jsonObject.getString("value");
                    int id = iUserServices.getIdFromUserName(username);
                    resp.setContentType("application/json");
                    if (id != -1) {
                        resp.getWriter().write(gson.toJson(id));
                    } else {
                        resp.sendError(HttpServletResponse.SC_NOT_FOUND, "No user found with the given username.");
                    }
                    break;
                case "/getQuantityUser":
                    int totalQuantityUser = iUserServices.getQuantityUser();
                    resp.getWriter().write(gson.toJson(totalQuantityUser));
                    break;
                case "/UsersPaging":
                    int size = 10;
                    int page = Integer.parseInt(req.getParameter("page"));
                    List<Users> usersPaging = iUserServices.getListUsersWithPaging(page,size);
                    resp.getWriter().write(gson.toJson(usersPaging));
                default:
                    break;
            }
        } catch (Exception e) {
            resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        resp.setContentType("application/json;charset=UTF-8");
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

                case "/insertRegister":
                    JSONObject jsonObject = new JSONObject(jsonString.toString());
                    JSONObject valueObject = jsonObject.getJSONObject("value");
                    Users newUser = gson.fromJson(valueObject.toString(), Users.class);
                    iUserServices.insertUser(newUser);
                    break;
                case "/sendmail" :

                    Connection conn = null;
                    try(PrintWriter out = resp.getWriter()) {
                        String email = req.getParameter("email");
                        conn = JdbcConnection.getConnection();
                        conn.setAutoCommit(false);

                        SendMail sendEmail = new SendMail();
                        String code = sendEmail.getRandom();
                        Users u = new Users(email, code);
                        boolean test = sendEmail.sendEmail(u);

                        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
                        OTP otp = new OTP(timestamp, email, code);

                        IOTPServices iotpServices = new OTPServicesimpl();
                        boolean checkInsert = iotpServices.insertOTP(otp);

                        if(test && checkInsert) {
                            conn.commit();
                            HttpSession session = req.getSession();
                            session.setAttribute("user", u);
                            resp.getWriter().write(gson.toJson(true));
                        } else {
                            conn.rollback();
                            resp.getWriter().write(gson.toJson(false));
                        }
                    } catch (Exception e) {
                        if (conn != null) {
                            try {
                                conn.rollback();
                            } catch (SQLException ex) {
                                ex.printStackTrace();
                            }
                        }
                        throw new RuntimeException(e);
                    } finally {
                        if (conn != null) {
                            try {
                                conn.setAutoCommit(true);
                                conn.close();
                            } catch (SQLException ex) {
                                ex.printStackTrace();
                            }
                        }
                    }
                    break;
                case "/resetPassword":
                    IOTPServices iotpServices = new OTPServicesimpl();
                    String code = req.getParameter("code");
                    OTP otpCheck = iotpServices.findOTPByOtpCode(code);
                    if(otpCheck != null) {
                        if(iotpServices.isOtpValid(otpCheck)){
                            resp.getWriter().write(gson.toJson(true));
                            iotpServices.updateActiveOTP(code,1);
                        } else {
                            resp.getWriter().write(gson.toJson("Mã OTP đã hết hạn"));
                        }
                    } else {
                        resp.getWriter().write(gson.toJson("Mã không chính xác"));
                    }
                    break;
                default:
                    break;
            }
        } catch (Exception e) {
            e.printStackTrace();
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
                case "/UpdatePassword" :
                    String password = req.getParameter("password");
                    String username = req.getParameter("username");
                    boolean check = iUserServices.updateForgotPassword(password,username);
                    if (check) {
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
