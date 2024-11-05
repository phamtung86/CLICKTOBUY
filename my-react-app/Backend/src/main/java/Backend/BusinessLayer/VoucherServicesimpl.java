package Backend.BusinessLayer;

import Backend.DataLayer.IVoucherReponsitory;
import Backend.DataLayer.VoucherReponsitoryimpl;
import Entity.Vouchers;

import java.util.ArrayList;
import java.util.Map;

public class VoucherServicesimpl implements  IVoucherServices{
    public IVoucherReponsitory iVoucherReponsitory;
    public VoucherServicesimpl() {
        iVoucherReponsitory = new VoucherReponsitoryimpl();
    }
    @Override
    public ArrayList<Vouchers> getListAllVouchers() {
        return iVoucherReponsitory.getListAllVouchers();
    }

    @Override
    public Map<Integer, Vouchers> mapVoucherByVoucherID() {
        return iVoucherReponsitory.mapVoucherByVoucherID();
    }

    @Override
    public Vouchers findVoucherById(String voucherCode) {
        return iVoucherReponsitory.findVoucherById(voucherCode);
    }

    @Override
    public boolean updateVoucher(Vouchers voucher) {
        return iVoucherReponsitory.updateVoucher(voucher);
    }

    @Override
    public boolean createNewVoucher(Vouchers voucher) {
        return iVoucherReponsitory.createNewVoucher(voucher);
    }

    @Override
    public boolean updateStatusVoucher(int id, int status) {
        return iVoucherReponsitory.updateStatusVoucher(id, status);
    }

}
