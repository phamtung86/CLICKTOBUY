package Entity;

public class VoucherDetail {
    private int id;
    private int value;
    private Vouchers vouchers;
    private VoucherDetailType voucherDetailType;

    public VoucherDetail(int id, int value, Vouchers vouchers, VoucherDetailType voucherDetailType) {
        this.id = id;
        this.value = value;
        this.vouchers = vouchers;
        this.voucherDetailType = voucherDetailType;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public Vouchers getVouchers() {
        return vouchers;
    }

    public void setVouchers(Vouchers vouchers) {
        this.vouchers = vouchers;
    }

    public VoucherDetailType getVoucherDetailType() {
        return voucherDetailType;
    }

    public void setVoucherDetailType(VoucherDetailType voucherDetailType) {
        this.voucherDetailType = voucherDetailType;
    }

    @Override
    public String toString() {
        return "VoucherDetail{" +
                "id=" + id +
                ", value=" + value +
                ", vouchers=" + vouchers +
                ", voucherDetailType=" + voucherDetailType +
                '}';
    }
}
