package Entity;

import java.sql.Timestamp;
import java.sql.Date;

public class Vouchers {
    private int id;
    private String code;
    private String name;
    private double minOrderAmount;
    private double maxOrderAmount;
    private Timestamp createAt;
    private Date expriryDate;
    private int value;
    private String type;
    private int status; // 0 la trang thai da khoa - 1 la trang thai dang mo

    public Vouchers(int id, String code, String name, double minOrderAmount, double maxOrderAmount, Timestamp createAt, Date expriryDate, int value, String type, int status) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.minOrderAmount = minOrderAmount;
        this.maxOrderAmount = maxOrderAmount;
        this.createAt = createAt;
        this.expriryDate = expriryDate;
        this.value = value;
        this.type = type;
        this.status = status;
    }
    public Vouchers(int id, String code, String name, double minOrderAmount, double maxOrderAmount, Timestamp createAt, Date expriryDate, int value, String type) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.minOrderAmount = minOrderAmount;
        this.maxOrderAmount = maxOrderAmount;
        this.createAt = createAt;
        this.expriryDate = expriryDate;
        this.value = value;
        this.type = type;

    }

    public Vouchers(String code, String name, double minOrderAmount, double maxOrderAmount, Timestamp createAt, Date expriryDate, int value, String type) {
        this.code = code;
        this.name = name;
        this.minOrderAmount = minOrderAmount;
        this.maxOrderAmount = maxOrderAmount;
        this.createAt = createAt;
        this.expriryDate = expriryDate;
        this.value = value;
        this.type = type;
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

    public Timestamp getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Timestamp createAt) {
        this.createAt = createAt;
    }

    public Date getExpriryDate() {
        return expriryDate;
    }

    public void setExpriryDate(Date expriryDate) {
        this.expriryDate = expriryDate;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
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
                ", value=" + value +
                ", type='" + type + '\'' +
                ", status=" + status +
                '}';
    }
}
