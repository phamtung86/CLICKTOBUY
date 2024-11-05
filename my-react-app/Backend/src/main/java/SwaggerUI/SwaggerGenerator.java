//package SwaggerUI;
//
//import io.swagger.v3.oas.integration.OpenApiContextLocator;
//import io.swagger.v3.oas.integration.SwaggerConfiguration;
//import io.swagger.v3.oas.integration.SwaggerSerializer;
//import io.swagger.v3.oas.integration.api.OpenApiContext;
//import io.swagger.v3.oas.integration.api.OpenApiContextLocator;
//import io.swagger.v3.oas.models.OpenAPI;
//
//import java.io.FileWriter;
//import java.io.IOException;
//import java.util.Set;
//
//public class SwaggerGenerator {
//    public void generateOpenApi() {
//        try {
//            // Cấu hình Swagger
//            SwaggerConfiguration config = new SwaggerConfiguration()
//                    .openAPI(new OpenAPI())
//                    .resourcePackages(Set.of("Backend/PresentationLayer/UsersController")); // Thay đổi "com.example" thành package chứa API của bạn
//
//            // Lấy OpenApiContext
//            OpenApiContext context = OpenApiContextLocator.getInstance().getOpenApiContext(String.valueOf(config));
//            OpenAPI openAPI = context.read(); // Lấy OpenAPI object
//
//            // Sử dụng SwaggerSerializer để chuyển đổi OpenAPI object thành JSON
//            SwaggerSerializer serializer = new SwaggerSerializer();
//            String json = serializer.writeAsJson(openAPI);
//
//            // Ghi dữ liệu JSON vào file
//            try (FileWriter file = new FileWriter("api-docs.json")) {
//                file.write(json);
//                System.out.println("OpenAPI JSON được lưu thành công vào api-docs.json");
//            }
//
//        } catch (IOException e) {
//            e.printStackTrace();
//            System.err.println("Lỗi khi ghi OpenAPI JSON vào file.");
//        }
//    }
//}
