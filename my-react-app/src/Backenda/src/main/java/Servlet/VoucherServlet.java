package Servlet;

import com.google.gson.Gson;
import controller.VoucherController;
import Entity.VoucherDetail;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet("/api/Vouchers/*")
public class VoucherServlet extends HttpServlet {
    private final VoucherController voucherController = new VoucherController();
    private final Gson gson = new Gson();

    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
        String pathInfo = req.getRequestURI();
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        String action = req.getParameter("action");
        if (pathInfo.equals("/api/Vouchers")) {
                try {
                    ArrayList<VoucherDetail> listVouchersDetail = voucherController.getListAllVoucherDetail();
                    res.getWriter().write(gson.toJson(listVouchersDetail));
                } catch (Exception e) {
                    e.printStackTrace();
                    res.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "An error occurred while processing the request.");
                }

        } else {
            res.sendError(HttpServletResponse.SC_NOT_FOUND, "Path not found");
        }

    }
}
