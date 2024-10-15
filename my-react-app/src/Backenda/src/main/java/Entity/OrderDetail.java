package Entity;

public class OrderDetail {
    private int id;
    private double price;
    private int quantity;
    private Products product;
    private int orderID;

    public OrderDetail(int id, double price, int quantity, Products product, int orderID) {
        this.id = id;
        this.price = price;
        this.quantity = quantity;
        this.product = product;
        this.orderID = orderID;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Products getProduct() {
        return product;
    }

    public void setProduct(Products product) {
        this.product = product;
    }

    public int getOrderID() {
        return orderID;
    }

    public void setOrderID(int orderID) {
        this.orderID = orderID;
    }

    @Override
    public String toString() {
        return "OrderDetail{" +
                "id=" + id +
                ", price=" + price +
                ", quantity=" + quantity +
                ", product=" + product +
                ", orderID=" + orderID +
                '}';
    }
}
