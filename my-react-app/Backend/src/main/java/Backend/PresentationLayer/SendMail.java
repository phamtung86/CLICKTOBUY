package Backend.PresentationLayer;

//import javax.mail.*;
//import javax.mail.internet.*;


public class SendMail {
//    private String to = "phamvantunga2004@gmail.com";
//    private String from = "haihau999990@gmail.com";
//    private String host = "smtp.gmail.com";
//    private final String username = "haihau999990@gmail.com"; // Thay bằng email của bạn
//    private final String password = "swzy ffuu zfvp jvzt"; // Thay bằng mật khẩu ứng dụng của bạn
//
//    public void sendEmail() {
//        // Thiết lập thuộc tính cho mail server
//        Properties properties = System.getProperties();
//        properties.setProperty("mail.smtp.host", host);
//        properties.setProperty("mail.smtp.port", "587");
//        properties.setProperty("mail.smtp.auth", "true");
//        properties.setProperty("mail.smtp.starttls.enable", "true");
//
//        // Tạo một phiên làm việc với các thuộc tính trên
//        Session session = Session.getInstance(properties, new Authenticator() {
//            protected PasswordAuthentication getPasswordAuthentication() {
//                return new PasswordAuthentication(username, password);
//            }
//        });
//
//        try {
//            // Tạo một đối tượng MimeMessage để soạn email
//            MimeMessage message = new MimeMessage(session);
//            message.setFrom(new InternetAddress(from));
//            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
//            message.setSubject("Ping");
//            message.setText("Hello, this is an example of sending email");
//
//            // Gửi email
//            Transport.send(message);
//            System.out.println("Message sent successfully....");
//        } catch (MessagingException mex) {
//            mex.printStackTrace();
//        }
//    }
}
