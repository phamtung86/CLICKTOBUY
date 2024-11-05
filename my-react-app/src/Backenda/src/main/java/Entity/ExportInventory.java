package Entity;

import java.sql.Timestamp;

public class ExportInventory {
    private int id;
    private Timestamp date;
    private double price;
    private int status;
    private String note;
    private Users userCreate;
    private Products products;
    private Users userOrder;
    private Order order;
    private OrderDetail orderDetail;
    public ExportInventory() {}

    public ExportInventory(double price, String note, Users userCreate, Products products, Users userOrder, Order order) {
        this.price = price;
        this.note = note;
        this.userCreate = userCreate;
        this.products = products;
        this.userOrder = userOrder;
        this.order = order;
    }

    public ExportInventory(int id, Timestamp date, double price, String note, Users userCreate, Products products, Users userOrder, OrderDetail orderDetail) {
        this.id = id;
        this.date = date;
        this.price = price;
        this.note = note;
        this.userCreate = userCreate;
        this.products = products;
        this.userOrder = userOrder;
        this.orderDetail = orderDetail;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Users getUserCreate() {
        return userCreate;
    }

    public void setUserCreate(Users userCreate) {
        this.userCreate = userCreate;
    }

    public Products getProducts() {
        return products;
    }

    public void setProducts(Products products) {
        this.products = products;
    }

    public Users getUserOrder() {
        return userOrder;
    }

    public void setUserOrder(Users userOrder) {
        this.userOrder = userOrder;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    @Override
    public String toString() {
        return "ExportInventory{" +
                "id=" + id +
                ", date=" + date +
                ", price=" + price +
                ", status=" + status +
                ", note='" + note + '\'' +
                ", userCreate=" + userCreate +
                ", products=" + products +
                ", userOrder=" + userOrder +
                ", order=" + order +
                '}';
    }
}
