package Backend.PresentationLayer;

import Backend.BusinessLayer.IVoucherServices;
import Backend.BusinessLayer.VoucherServicesimpl;
import Entity.VoucherDetail;
import com.google.gson.Gson;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet("/api/Vouchers/*")
public class VoucherController extends HttpServlet {
    private IVoucherServices iVoucherServices;

    private final Gson gson = new Gson();

    public VoucherController() {

        iVoucherServices = new VoucherServicesimpl();
    }

    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException {
        String pathInfo = req.getRequestURI();
        res.setContentType("application/json");
        res.setCharacterEncoding("UTF-8");
        String action = req.getParameter("action");
        if (pathInfo.equals("/api/Vouchers")) {
            try {
                ArrayList<VoucherDetail> listVouchersDetail = iVoucherServices.getListAllVoucherDetail();
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
