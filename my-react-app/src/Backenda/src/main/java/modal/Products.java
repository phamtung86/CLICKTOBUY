package modal;

import java.util.Date;

public class Products {
    public int productId;
    public String productName;
    public String productDescription;
    public double productPrice;
    public int productStock;
    public Date productCreateAt;
    public String productNote;
    public String productUnit;
    public int productDiscount;
    public String productImageLink;
    public int categoriesID;
    public Categories categories;

    public Products(int productId, String productName, String productDescription, double productPrice, int productStock, Date productCreateAt, String productNote, String productUnit, int productDiscount, String productImageLink, int categoriesID, Categories categories) {
        this.productId = productId;
        this.productName = productName;
        this.productDescription = productDescription;
        this.productPrice = productPrice;
        this.productStock = productStock;
        this.productCreateAt = productCreateAt;
        this.productNote = productNote;
        this.productUnit = productUnit;
        this.productDiscount = productDiscount;
        this.productImageLink = productImageLink;
        this.categoriesID = categoriesID;
        this.categories = categories;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public double getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(double productPrice) {
        this.productPrice = productPrice;
    }

    public int getProductStock() {
        return productStock;
    }

    public void setProductStock(int productStock) {
        this.productStock = productStock;
    }

    public Date getProductCreateAt() {
        return productCreateAt;
    }

    public void setProductCreateAt(Date productCreateAt) {
        this.productCreateAt = productCreateAt;
    }

    public String getProductNote() {
        return productNote;
    }

    public void setProductNote(String productNote) {
        this.productNote = productNote;
    }

    public String getProductUnit() {
        return productUnit;
    }

    public void setProductUnit(String productUnit) {
        this.productUnit = productUnit;
    }

    public int getProductDiscount() {
        return productDiscount;
    }

    public void setProductDiscount(int productDiscount) {
        this.productDiscount = productDiscount;
    }

    public String getProductImageLink() {
        return productImageLink;
    }

    public void setProductImageLink(String productImageLink) {
        this.productImageLink = productImageLink;
    }

    public int getCategoriesID() {
        return categoriesID;
    }

    public void setCategoriesID(int categoriesID) {
        this.categoriesID = categoriesID;
    }

    public Categories getCategories() {
        return categories;
    }

    public void setCategories(Categories categories) {
        this.categories = categories;
    }

    @Override
    public String toString() {
        return "Products{" +
                "productId=" + productId +
                ", productName='" + productName + '\'' +
                ", productDescription='" + productDescription + '\'' +
                ", productPrice=" + productPrice +
                ", productStock=" + productStock +
                ", productCreateAt=" + productCreateAt +
                ", productNote='" + productNote + '\'' +
                ", productUnit='" + productUnit + '\'' +
                ", productDiscount=" + productDiscount +
                ", productImageLink='" + productImageLink + '\'' +
                ", categoriesID=" + categoriesID +
                ", categories=" + categories +
                '}';
    }
}