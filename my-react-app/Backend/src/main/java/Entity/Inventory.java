package Entity;

import java.sql.Timestamp;

public class Inventory {
    private int id;
    private int currentQuantity;
    private Timestamp lastUpdate;
    private int safeStockLevel;
    private int reoderPoint;
    private Products products;

    public Inventory(int id, int currentQuantity, Timestamp lastUpdate, int safeStockLevel, int reoderPoint, Products products) {
        this.id = id;
        this.currentQuantity = currentQuantity;
        this.lastUpdate = lastUpdate;
        this.safeStockLevel = safeStockLevel;
        this.reoderPoint = reoderPoint;
        this.products = products;
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCurrentQuantity() {
        return currentQuantity;
    }

    public void setCurrentQuantity(int currentQuantity) {
        this.currentQuantity = currentQuantity;
    }

    public Timestamp getLastUpdate() {
        return lastUpdate;
    }

    public void setLastUpdate(Timestamp lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    public int getSafeStockLevel() {
        return safeStockLevel;
    }

    public void setSafeStockLevel(int safeStockLevel) {
        this.safeStockLevel = safeStockLevel;
    }

    public int getReoderPoint() {
        return reoderPoint;
    }

    public void setReoderPoint(int reoderPoint) {
        this.reoderPoint = reoderPoint;
    }

    public Products getProducts() {
        return products;
    }

    public void setProducts(Products products) {
        this.products = products;
    }

    @Override
    public String toString() {
        return "Inventory{" +
                "id=" + id +
                ", currentQuantity=" + currentQuantity +
                ", lastUpdate=" + lastUpdate +
                ", safeStockLevel=" + safeStockLevel +
                ", reoderPoint=" + reoderPoint +
                ", products=" + products +
                '}';
    }
}
