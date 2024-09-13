package controller;

import Entity.Products;
import Services.IProductServices;
import Services.ProductServicesimpl;

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
    public ArrayList<Products> getListProductMilk (){
        return iProductServices.getListProductMilk();
    }
    public ArrayList<Products> getListProductVegetable (){
        return iProductServices.getListProductVegetable();
    }
    public ArrayList<Products> getListProductCleanChemical (){
        return iProductServices.getListProductCleanChemical();
    }
    public ArrayList<Products> getListProductTakeCare (){
        return iProductServices.getListProductTakeCare();
    }
    public ArrayList<Products> listProductSearchByName(String productName){
        return iProductServices.listProductSearchByName(productName);
    }
}

