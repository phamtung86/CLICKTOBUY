package Reponsitory;

import Entity.Users;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.util.ArrayList;
import java.util.Date;

public class AuthReponsitoryimpl implements IAuthReponsitory {
    private static final String SECRET_KEY = "X2F1Op3e59bmUJZG5Vg8xNBPzXaLtPwFlZzD1G0Vj0I="; // Khóa bí mật của bạn
    private static final long EXPIRATION_TIME = 3600000; // Thời gian hết hạn (1 giờ)

    @Override
    public String authAccount(String userName, String passWord, ArrayList<Users> listDataUser) {
        for (Users user : listDataUser) {
            if (user.getUserName().equals(userName) && user.getPassword().equals(passWord)) {
                // Tạo JWT token
                String token = Jwts.builder()
                        .setIssuer("CLICKTOBUY")            // Người phát hành
                        .setSubject(user.getUserName())// Chủ thể (username)
                        .claim("id", user.getUserID())
                        .claim("role", user.getRole())      // Claim bổ sung (role)
                        .claim("fullName", user.getFullName())  // Claim bổ sung (fullname)
                        .setIssuedAt(new Date())            // Thời gian phát hành
                        .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // Thời gian hết hạn
                        .signWith(SignatureAlgorithm.HS256, SECRET_KEY) // Ký với thuật toán và secret key
                        .compact();
                return token;
            }
        }
        return ""; // Trả về chuỗi rỗng nếu không tìm thấy người dùng hợp lệ
    }
}
