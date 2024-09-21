package Backend.BusinessLayer;

import Backend.DataLayer.IProductReponsitory;
import Backend.DataLayer.ProductReponsitoryImpl;
import Entity.Products;

import java.util.ArrayList;

public class ProductServicesimpl implements  IProductServices {
    public IProductReponsitory iProductReponsitory;
    public ProductServicesimpl() {
        iProductReponsitory = new ProductReponsitoryImpl();
    }
    @Override
    public ArrayList<Products> getAllListProduct() {
        return iProductReponsitory.getAllListProduct();
    }

    @Override
    public ArrayList<Products> getListProductSale() {
        return iProductReponsitory.getListProductSale();
    }

    @Override
    public ArrayList<Products> getListProductType(int categoryIDType) {
        return iProductReponsitory.getListProductType(categoryIDType);
    }


    @Override
    public ArrayList<Products> listProductSearchByName(String productName) {
        return iProductReponsitory.listProductSearchByName(productName);
    }

    @Override
    public boolean modifyProduct(Products product) {
        return iProductReponsitory.modifyProduct(product);
    }

    @Override
    public boolean insertProduct(Products product, int categoryID) {
        return iProductReponsitory.insertProduct(product, categoryID);
    }

    @Override
    public boolean deleteProduct(int productID) {
        return iProductReponsitory.deleteProduct(productID);
    }
}
