package Backend.Mail;

import Entity.Users;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;
import java.util.Random;

public class SendMail {
    public String getRandom() {
        Random rand = new Random();
        int number = rand.nextInt(999999);
        return String.format("%06d", number);
    }

    public boolean sendEmail(Users user) {
        boolean test = false;
        String toEmail = user.getEmail();
        String fromEmail = "phamvantung149@gmail.com";
        String password = "pnaz znqf dfkx vvpp";

        try {
            Properties props = new Properties();
            props.setProperty("mail.smtp.host", "smtp.gmail.com");
            props.setProperty("mail.smtp.auth", "true");
            props.setProperty("mail.smtp.port", "587");
            props.setProperty("mail.smtp.starttls.enable", "true");

            Session session = Session.getInstance(props, new Authenticator() {
                @Override
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(fromEmail, password);
                }
            });

            Message message = new MimeMessage(session);
            message.setRecipient(Message.RecipientType.TO, new InternetAddress(toEmail));
            message.setSubject("Reset password");
            message.setText("Your OTP code is: " + user.getPassword()); // Cập nhật nội dung email để chứa mã OTP

            Transport.send(message);
            test = true;
        } catch (MessagingException e) {
            System.out.println("Messaging Exception: " + e.getMessage());
        } catch (Exception e) {
            System.out.println("Exception: " + e.getMessage());
        }
        return test;
    }
}
