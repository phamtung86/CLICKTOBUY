package Backend.PresentationLayer;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.servlet.FilterHolder;
import org.eclipse.jetty.servlets.CrossOriginFilter;

import javax.servlet.DispatcherType;
import javax.servlet.Servlet;
import java.util.EnumSet;

public class Program {
    public static void main(String[] args) {
        Server server = new Server(8080);

        // Thiết lập context handler cho server
        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.setContextPath("/");
        server.setHandler(context);

        // Đăng ký CORS filter
        FilterHolder cors = new FilterHolder(new CrossOriginFilter());
        cors.setInitParameter(CrossOriginFilter.ALLOWED_ORIGINS_PARAM, "*");
        cors.setInitParameter(CrossOriginFilter.ALLOWED_METHODS_PARAM, "GET,POST,HEAD,OPTIONS,PUT,DELETE");
        cors.setInitParameter(CrossOriginFilter.ALLOWED_HEADERS_PARAM, "X-Requested-With,Content-Type,Accept,Origin");
        context.addFilter(cors, "/*", EnumSet.of(DispatcherType.REQUEST));

        // Đăng ký các servlet cho API
        context.addServlet(new ServletHolder(new Productcontroller()), "/api/Products/*");
        context.addServlet(new ServletHolder(new UsersController()), "/api/Users/*");
        context.addServlet(new ServletHolder(new VoucherController()), "/api/Vouchers/*");
        context.addServlet(new ServletHolder(new OrderController()), "/api/Orders/*");
        context.addServlet(new ServletHolder(new OrderDetailController()), "/api/OrdersDetail/*");
        context.addServlet(new ServletHolder(new ProductDetailController()), "/api/ProductDetail/*");
        context.addServlet(new ServletHolder(new CategoriesController()), "/api/Categories/*");
        context.addServlet(new ServletHolder(new AuthController()), "/api/Auth/*");
        context.addServlet(new ServletHolder(new InventoryController()), "/api/Inventorys/*");
        context.addServlet(new ServletHolder(new ImportInventoryController()), "/api/ImportInventorys/*");
        context.addServlet(new ServletHolder(new ExportInventoryController()), "/api/ExportInventories/*");
        // Đăng ký WebSocket endpoint


        try {
            // Bắt đầu server
            server.start();
            System.out.println("Server started on http://localhost:8080");
            server.join();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
