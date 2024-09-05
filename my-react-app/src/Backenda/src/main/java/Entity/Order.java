package Entity;

import java.util.Date;

public class Order {
    private int orderID;
    private Date orderDate;
    private String status;
    private double TotalAmount;
    private double totalFee;
    private Users users;
    private Vouchers vouchers;

    public Order(int orderID, Date orderDate, String status, double totalAmount, double totalFee, Users users, Vouchers vouchers) {
        this.orderID = orderID;
        this.orderDate = orderDate;
        this.status = status;
        TotalAmount = totalAmount;
        this.totalFee = totalFee;
        this.users = users;
        this.vouchers = vouchers;
    }

    public int getOrderID() {
        return orderID;
    }

    public void setOrderID(int orderID) {
        this.orderID = orderID;
    }

    public Date getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Date orderDate) {
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
                ", users=" + users +
                ", vouchers=" + vouchers +
                '}';
    }
}
