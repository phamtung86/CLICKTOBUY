package Services;

import Reponsitory.IVoucherReponsitory;
import Reponsitory.VoucherReponsitoryimpl;
import Entity.VoucherDetail;

import java.util.ArrayList;

public class VoucherServicesimpl implements  IVoucherServices{
    public IVoucherReponsitory iVoucherReponsitory;
    public VoucherServicesimpl() {
        iVoucherReponsitory = new VoucherReponsitoryimpl();
    }
    @Override
    public ArrayList<VoucherDetail> getListAllVoucherDetail() {
        return iVoucherReponsitory.getListAllVoucherDetail();
    }
}
