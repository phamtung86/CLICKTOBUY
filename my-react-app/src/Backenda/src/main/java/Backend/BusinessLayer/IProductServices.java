package Backend.BusinessLayer;

import Entity.Categories;
import Entity.Products;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface IProductServices {
    public ArrayList<Products> getAllListProduct (Map<Integer, Categories> categoriesMap );
    public ArrayList<Products> getListProductSale (Map<Integer, Categories> categoriesMap);
    public ArrayList<Products> getListProductType(int categoryIDType,Map<Integer, Categories> categoriesMap);
    public ArrayList<Products> listProductSearchByName(String productName,Map<Integer, Categories> categoriesMap );
    public boolean modifyProduct(Products product);
    public boolean insertProduct(Products product,int categoryID);
    public boolean deleteProduct(int productID);
    public Map<Integer,Products> getProductsMap();
    public List<Products> findProductByCategoryID(int categoryID);
}
