package Entity;

import java.util.Date;

public class Vouchers {
    private int id;
    private String code;
    private String name;
    private double minOrderAmount;
    private double maxOrderAmount;
    private java.sql.Date createAt;
    private Date expriryDate;

    public Vouchers(int id, String code, String name, double minOrderAmount, double maxOrderAmount, java.sql.Date createAt, Date expriryDate) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.minOrderAmount = minOrderAmount;
        this.maxOrderAmount = maxOrderAmount;
        this.createAt = createAt;
        this.expriryDate = expriryDate;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getMinOrderAmount() {
        return minOrderAmount;
    }

    public void setMinOrderAmount(double minOrderAmount) {
        this.minOrderAmount = minOrderAmount;
    }

    public double getMaxOrderAmount() {
        return maxOrderAmount;
    }

    public void setMaxOrderAmount(double maxOrderAmount) {
        this.maxOrderAmount = maxOrderAmount;
    }

    public java.sql.Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(java.sql.Date createAt) {
        this.createAt = createAt;
    }

    public Date getExpriryDate() {
        return expriryDate;
    }

    public void setExpriryDate(Date expriryDate) {
        this.expriryDate = expriryDate;
    }

    @Override
    public String toString() {
        return "Vouchers{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", name='" + name + '\'' +
                ", minOrderAmount=" + minOrderAmount +
                ", maxOrderAmount=" + maxOrderAmount +
                ", createAt=" + createAt +
                ", expriryDate=" + expriryDate +
                '}';
    }
}
