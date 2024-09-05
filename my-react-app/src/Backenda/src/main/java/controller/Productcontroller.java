package controller;

import Services.IProductServices;
import Services.ProductServicesimpl;

import java.util.List;

public class Productcontroller {
    private IProductServices iProductServices;

    public Productcontroller() {
        iProductServices = new ProductServicesimpl();
    }

    public List<Entity.Products> getAllListProduct() {
        return iProductServices.getAllListProduct();
    }

}

