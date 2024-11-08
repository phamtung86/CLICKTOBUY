package Backend.BusinessLayer;

import Backend.DataLayer.IOTPReponsitory;
import Backend.DataLayer.OTPReponsitoryimpl;
import Entity.OTP;

public class OTPServicesimpl implements IOTPServices{
    private final IOTPReponsitory iotpReponsitory;
    private static final int OTP_EXPIRATION_MINUTES = 5;
    public OTPServicesimpl() {
        iotpReponsitory = new OTPReponsitoryimpl();
    }
    @Override
    public boolean insertOTP(OTP otp) {
        return iotpReponsitory.insertOTP(otp);
    }

    @Override
    public OTP findOTPByOtpCode(String otpCode) {
        return iotpReponsitory.findOTPByOtpCode(otpCode);
    }

    public boolean isOtpValid(OTP otp) {
        long currentTimeMillis = System.currentTimeMillis();
        long otpTimeMillis = otp.getExpirationDate().getTime();
        long expirationTimeMillis = otpTimeMillis + OTP_EXPIRATION_MINUTES * 60 * 1000;
        return currentTimeMillis <= expirationTimeMillis;
    }

    @Override
    public boolean updateActiveOTP (String code, int isActiveOTP) {
        return iotpReponsitory.updateActiveOTP(code, isActiveOTP);
    }
}
