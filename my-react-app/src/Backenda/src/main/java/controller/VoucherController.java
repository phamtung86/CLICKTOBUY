package controller;

import Services.IVoucherServices;
import Services.VoucherServicesimpl;
import Entity.VoucherDetail;

import java.util.ArrayList;

public class VoucherController {
    private IVoucherServices iVoucherServices;

    public VoucherController() {

        iVoucherServices = new VoucherServicesimpl();
    }

    public ArrayList<VoucherDetail> getListAllVoucherDetail() {
        return iVoucherServices.getListAllVoucherDetail();
    }

}
