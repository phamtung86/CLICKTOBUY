package Entity;

import java.sql.Timestamp;

public class ProductDetail {
    private int id;
    private String origin;
    private String igredient;
    private String instruction;
    private String preserve;
    private String description;
    private Timestamp productDate;
    private String expiry;
    private String note;
    private Products products;

    public ProductDetail(int id, String origin, String igredient, String instruction, String preserve, String description, Timestamp productDate, String expiry, String note, Products products) {
        this.id = id;
        this.origin = origin;
        this.igredient = igredient;
        this.instruction = instruction;
        this.preserve = preserve;
        this.description = description;
        this.productDate = productDate;
        this.expiry = expiry;
        this.note = note;
        this.products = products;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getOrigin() {
        return origin;
    }

    public void setOrigin(String origin) {
        this.origin = origin;
    }

    public String getIgredient() {
        return igredient;
    }

    public void setIgredient(String igredient) {
        this.igredient = igredient;
    }

    public String getInstruction() {
        return instruction;
    }

    public void setInstruction(String instruction) {
        this.instruction = instruction;
    }

    public String getPreserve() {
        return preserve;
    }

    public void setPreserve(String preserve) {
        this.preserve = preserve;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Timestamp getProductDate() {
        return productDate;
    }

    public void setProductDate(Timestamp productDate) {
        this.productDate = productDate;
    }

    public String getExpiry() {
        return expiry;
    }

    public void setExpiry(String expiry) {
        this.expiry = expiry;
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
        return "ProductDetail{" +
                "id=" + id +
                ", origin='" + origin + '\'' +
                ", igredient='" + igredient + '\'' +
                ", instruction='" + instruction + '\'' +
                ", preserve='" + preserve + '\'' +
                ", description='" + description + '\'' +
                ", productDate=" + productDate +
                ", expiry='" + expiry + '\'' +
                ", note='" + note + '\'' +
                ", products=" + products +
                '}';
    }
}
