package Services;

import Reponsitory.IProductReponsitory;
import Reponsitory.ProductReponsitoryImpl;
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
    public ArrayList<Products> getListProductMilk() {
        return iProductReponsitory.getListProductMilk();
    }

    @Override
    public ArrayList<Products> getListProductVegetable() {
        return iProductReponsitory.getListProductVegetable();
    }

    @Override
    public ArrayList<Products> getListProductCleanChemical() {
        return iProductReponsitory.getListProductCleanChemical();
    }

    @Override
    public ArrayList<Products> getListProductTakeCare() {
        return iProductReponsitory .getListProductTakeCare();
    }

    @Override
    public ArrayList<Products> listProductSearchByName(String productName) {
        return iProductReponsitory.listProductSearchByName(productName);
    }
}
