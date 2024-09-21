package Backend.PresentationLayer;

import Entity.Products;
import Backend.BusinessLayer.IProductServices;
import Backend.BusinessLayer.ProductServicesimpl;

import java.util.ArrayList;
import java.util.List;

public class Productcontroller {
    private final IProductServices iProductServices;

    public Productcontroller() {
        iProductServices = new ProductServicesimpl();
    }

    public List<Entity.Products> getAllListProduct() {
        return iProductServices.getAllListProduct();
    }

    public ArrayList<Products> getListProductSale() {
        return iProductServices.getListProductSale();
    }
    public ArrayList<Products> getListProductType(int categoryIDType){
        return iProductServices.getListProductType(categoryIDType);
    }
    public ArrayList<Products> listProductSearchByName(String productName){
        return iProductServices.listProductSearchByName(productName);
    }
    public boolean modifyProduct(Products product){
        return iProductServices.modifyProduct(product);
    }
    public boolean insertProduct(Products product,int categoryID){
        return iProductServices.insertProduct(product,categoryID);
    }
    public boolean deleteProduct(int productID){
        return iProductServices.deleteProduct(productID);
    }
}

