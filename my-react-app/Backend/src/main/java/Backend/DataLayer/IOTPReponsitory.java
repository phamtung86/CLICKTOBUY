package Backend.DataLayer;

import Entity.OTP;

public interface IOTPReponsitory {
    public boolean insertOTP (OTP otp);
    public OTP findOTPByOtpCode (String otpCode);
    public boolean updateActiveOTP (String code, int isActiveOTP);
}
