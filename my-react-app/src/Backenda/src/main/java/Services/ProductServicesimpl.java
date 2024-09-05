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
}
