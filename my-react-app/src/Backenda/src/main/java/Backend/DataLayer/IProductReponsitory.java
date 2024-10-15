package Backend.DataLayer;

import Entity.Products;

import java.util.ArrayList;
import java.util.Map;

public interface IProductReponsitory {
    public ArrayList<Products> getAllListProduct();

    public ArrayList<Products> getListProductSale();

    public ArrayList<Products> getListProductType(int categoryIDType);

    public ArrayList<Products> listProductSearchByName(String productName);

    public boolean modifyProduct(Products product);

    public boolean insertProduct(Products product, int categoryID);

    public boolean deleteProduct(int productID);

    public Map<Integer, Products> getProductsMap();
}
