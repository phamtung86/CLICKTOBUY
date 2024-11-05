package Backend.DataLayer;

import Entity.Vouchers;

import java.util.ArrayList;
import java.util.Map;

public interface IVoucherReponsitory {
    public ArrayList<Vouchers> getListAllVouchers();
    public Map<Integer, Vouchers> mapVoucherByVoucherID();
    public Vouchers findVoucherById(String voucherCode);
    public boolean updateVoucher(Vouchers voucher);
    public boolean createNewVoucher(Vouchers voucher);
    public boolean updateStatusVoucher(int id, int status);
}
