package controller;

import Services.Productservice;

import java.util.List;

public class Productcontroller {
    private Services.Productservice productservice;

    public Productcontroller(Productservice productservice) {
        this.productservice = productservice;
    }

    public List<modal.Products> getAllProducts() {
        return productservice.selectAllProducts();
    }
}

