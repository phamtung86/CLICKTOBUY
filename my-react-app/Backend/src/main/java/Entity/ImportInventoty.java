package Entity;


import java.sql.Timestamp;

public class ImportInventoty {
    private int id;
    private int quantity;
    private Timestamp date;
    private double price;
    private int status;
    private int createBy;
    private String note;
    private Products products;


    public ImportInventoty() {
    }

    public ImportInventoty(int quantity,double price, int createBy, String note, Products products) {
        this.quantity = quantity;
        this.price = price;
        this.createBy = createBy;
        this.note = note;
        this.products = products;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
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

    public int getCreateBy() {
        return createBy;
    }

    public void setCreateBy(int createBy) {
        this.createBy = createBy;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Products getProducts() {
        return products;
    }

    public void setProducts(Products products) {
        this.products = products;
    }

    @Override
    public String toString() {
        return "ImportInventoty{" +
                "id=" + id +
                ", quantity=" + quantity +
                ", date=" + date +
                ", price=" + price +
                ", status=" + status +
                ", createBy=" + createBy +
                ", note='" + note + '\'' +
                ", products=" + products +
                '}';
    }
}
