package Backend.PresentationLayer;

import Servlet.*;
import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.eclipse.jetty.servlet.FilterHolder;
import org.eclipse.jetty.servlets.CrossOriginFilter;

import javax.servlet.DispatcherType;
import java.util.EnumSet;

public class Program {
    public static void main(String[] args) throws Exception {
        Server server = new Server(8080);

        ServletContextHandler context = new ServletContextHandler(ServletContextHandler.SESSIONS);
        context.setContextPath("/");
        server.setHandler(context);

        // Đăng ký CORS filter
        FilterHolder cors = new FilterHolder(new CrossOriginFilter());
        cors.setInitParameter(CrossOriginFilter.ALLOWED_ORIGINS_PARAM, "*");
        cors.setInitParameter(CrossOriginFilter.ALLOWED_METHODS_PARAM, "GET,POST,HEAD,OPTIONS,PUT,DELETE");
        cors.setInitParameter(CrossOriginFilter.ALLOWED_HEADERS_PARAM, "X-Requested-With,Content-Type,Accept,Origin");
        context.addFilter(cors, "/*", EnumSet.of(DispatcherType.REQUEST));

        // Đăng ký servlet
        context.addServlet(new ServletHolder(new Productservlet()), "/api/Products/*");
        context.addServlet(new ServletHolder(new UsersServlet()), "/api/Users/*");
        context.addServlet(new ServletHolder(new VoucherServlet()), "/api/Vouchers/*");
        context.addServlet(new ServletHolder(new OrderServlet()), "/api/Orders/*");
        context.addServlet(new ServletHolder(new ProductDetailServlet()), "/api/ProductDetail/*");
        context.addServlet(new ServletHolder(new CategoriesServlet()), "/api/Categories/*");
        context.addServlet(new ServletHolder(new AuthServlet()), "/api/Auth/*");
        // Bắt đầu server
        server.start();
//    SendMail sendMail = new SendMail();
//    sendMail.sendEmail();
        server.join();
    }
}
