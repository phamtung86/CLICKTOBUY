package Entity;

import java.sql.Timestamp;

public class OTP {
    private int id;
    private String otp;
    private String email;
    private Timestamp expirationDate;
    public int isActive;

    public OTP() {
    }

    public OTP(Timestamp expirationDate, String email, String otp) {
        this.expirationDate = expirationDate;
        this.email = email;
        this.otp = otp;
    }

    public OTP(int id, String otp, String email, Timestamp expirationDate, int isActive) {
        this.id = id;
        this.otp = otp;
        this.email = email;
        this.expirationDate = expirationDate;
        this.isActive = isActive;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Timestamp getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Timestamp expirationDate) {
        this.expirationDate = expirationDate;
    }

    public int getIsActive() {
        return isActive;
    }

    public void setIsActive(int isActive) {
        this.isActive = isActive;
    }

    @Override
    public String toString() {
        return "OTP{" +
                "id=" + id +
                ", otp='" + otp + '\'' +
                ", email='" + email + '\'' +
                ", expirationDate=" + expirationDate +
                ", isActive=" + isActive +
                '}';
    }
}
