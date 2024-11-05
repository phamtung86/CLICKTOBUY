package Entity;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.Date;

public class Order {
    private int orderID;
    private Timestamp orderDate;
    private String status;
    private double TotalAmount;
    private double totalFee;
    private Timestamp statusDate;
    private Users users;
    private Vouchers vouchers;

    public Order(int orderID, Timestamp orderDate, String status, double totalAmount, double totalFee, Timestamp statusDate, Users users, Vouchers vouchers) {
        this.orderID = orderID;
        this.orderDate = orderDate;
        this.status = status;
        TotalAmount = totalAmount;
        this.totalFee = totalFee;
        this.statusDate = statusDate;
        this.users = users;
        this.vouchers = vouchers;
    }

    public int getOrderID() {
        return orderID;
    }

    public void setOrderID(int orderID) {
        this.orderID = orderID;
    }

    public Timestamp getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Timestamp orderDate) {
        this.orderDate = orderDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public double getTotalAmount() {
        return TotalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        TotalAmount = totalAmount;
    }

    public double getTotalFee() {
        return totalFee;
    }

    public void setTotalFee(double totalFee) {
        this.totalFee = totalFee;
    }

    public Timestamp getStatusDate() {
        return statusDate;
    }

    public void setStatusDate(Timestamp statusDate) {
        this.statusDate = statusDate;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public Vouchers getVouchers() {
        return vouchers;
    }

    public void setVouchers(Vouchers vouchers) {
        this.vouchers = vouchers;
    }

    @Override
    public String toString() {
        return "Order{" +
                "orderID=" + orderID +
                ", orderDate=" + orderDate +
                ", status='" + status + '\'' +
                ", TotalAmount=" + TotalAmount +
                ", totalFee=" + totalFee +
                ", statusDate=" + statusDate +
                ", users=" + users +
                ", vouchers=" + vouchers +
                '}';
    }
}
