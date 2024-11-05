package Backend.PresentationLayer;

import Backend.BusinessLayer.IVoucherServices;
import Backend.BusinessLayer.VoucherServicesimpl;
import Entity.Vouchers;
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
import java.sql.Date;

@WebServlet("/api/Vouchers/*")
public class VoucherController extends HttpServlet {
    private final IVoucherServices iVoucherServices;

    private final Gson gson = new Gson();

    public VoucherController() {

        iVoucherServices = new VoucherServicesimpl();
    }

    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
        String pathInfo = req.getPathInfo();
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        switch (pathInfo) {
            case "/ListVouchers":
                try {
                    ArrayList<Vouchers> listVouchersDetail = iVoucherServices.getListAllVouchers();
                    res.getWriter().write(gson.toJson(listVouchersDetail));
                } catch (Exception e) {
                    e.printStackTrace();
                    res.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "An error occurred while processing the request.");
                }
                break;
            case "/VoucherByID":
                String voucherCode = req.getParameter("voucherCode");
                Vouchers vouchers = iVoucherServices.findVoucherById(voucherCode);
                res.getWriter().write(gson.toJson(vouchers));
                break;
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        try {
            if (pathInfo == null || pathInfo.equals("/")) {
                resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
                return;
            } else {
                StringBuilder stringBuilder = new StringBuilder();
                String line;
                try (BufferedReader reader = req.getReader()) {
                    while ((line = reader.readLine()) != null) {
                        stringBuilder.append(line);
                    }
                }
                JSONObject jsonObject = new JSONObject(stringBuilder.toString());
                switch (pathInfo) {
                    case "/vouchers":
                        String code = jsonObject.getString("code");
                        String name = jsonObject.getString("name");
                        double minOrderAmount = jsonObject.getDouble("minOrderAmount");
                        double maxOrderAmount = jsonObject.getDouble("maxOrderAmount");

                        // Chuyển đổi chuỗi thành Timestamp và Date
                        String createAtStr = jsonObject.getString("createAt");
                        Timestamp createAt = Timestamp.valueOf(createAtStr + " 00:00:00");

                        String expiryDateStr = jsonObject.getString("expiryDate");
                        Date expiryDate = Date.valueOf(expiryDateStr);

                        String type = jsonObject.getString("type");
                        int value = jsonObject.getInt("value");

                        Vouchers vouchers = new Vouchers(code, name, minOrderAmount, maxOrderAmount, createAt, expiryDate, value, type);
                        boolean check = iVoucherServices.createNewVoucher(vouchers);
                        resp.getWriter().write(gson.toJson(check));
                        break;
                }
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }


    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();
        try {
            if (pathInfo == null || pathInfo.equals("/")) {
                resp.sendError(HttpServletResponse.SC_BAD_REQUEST);
                return;
            } else {
                StringBuilder stringBuilder = new StringBuilder();
                String line;
                try (BufferedReader reader = req.getReader()) {
                    while ((line = reader.readLine()) != null) {
                        stringBuilder.append(line);
                    }
                }
                switch (pathInfo) {
                    case "/vouchers":
                        JSONObject jsonObject = new JSONObject(stringBuilder.toString());
                        int id = jsonObject.getInt("id");
                        String code = jsonObject.getString("code");
                        String name = jsonObject.getString("name");
                        double minOrderAmount = jsonObject.getDouble("minOrderAmount");
                        double maxOrderAmount = jsonObject.getDouble("maxOrderAmount");

                        // Chuyển đổi chuỗi thành Timestamp và Date
                        String createAtStr = jsonObject.getString("createAt");
                        Timestamp createAt = Timestamp.valueOf(createAtStr + " 00:00:00");
                        String expiryDateStr = jsonObject.getString("expiryDate");
                        Date expiryDate = Date.valueOf(expiryDateStr);

                        String type = jsonObject.getString("type");
                        int value = jsonObject.getInt("value");

                        Vouchers vouchers = new Vouchers(id,code, name, minOrderAmount, maxOrderAmount, createAt, expiryDate, value, type);
                        boolean check = iVoucherServices.updateVoucher(vouchers);
                        resp.getWriter().write(gson.toJson(check));
                        break;
                    case "/status" :
                        int voucherId = Integer.parseInt(req.getParameter("voucherId"));
                        int status = Integer.parseInt(req.getParameter("status"));
                        boolean checkUpdateStatus = iVoucherServices.updateStatusVoucher(voucherId,status);
                        resp.getWriter().write(gson.toJson(checkUpdateStatus));
                        break;


                }
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }


}
