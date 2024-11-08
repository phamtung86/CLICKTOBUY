package Backend.BusinessLayer;

import Entity.OTP;

public interface IOTPServices {
    public boolean insertOTP (OTP otp);
    public OTP findOTPByOtpCode(String otpCode);
    public boolean isOtpValid(OTP otp);
    public boolean updateActiveOTP (String code, int isActiveOTP);
}
