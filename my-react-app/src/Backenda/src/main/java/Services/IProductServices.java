package Services;

import Entity.Products;

import java.util.ArrayList;

public interface IProductServices {
    public ArrayList<Products> getAllListProduct ();
    public ArrayList<Products> getListProductSale ();
    public ArrayList<Products> getListProductType(int categoryIDType);
    public ArrayList<Products> listProductSearchByName(String productName);
    public boolean modifyProduct(Products product);
    public boolean insertProduct(Products product,int categoryID);
    public boolean deleteProduct(int productID);
}
