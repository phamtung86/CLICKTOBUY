package Reponsitory;

import Entity.Products;

import java.util.ArrayList;

public interface IProductReponsitory {
    public ArrayList<Products> getAllListProduct ();
    public ArrayList<Products> getListProductSale ();
    public ArrayList<Products> getListProductMilk ();
    public ArrayList<Products> getListProductVegetable ();
    public ArrayList<Products> getListProductCleanChemical ();
    public ArrayList<Products> getListProductTakeCare ();
    public ArrayList<Products> listProductSearchByName(String productName);
}
