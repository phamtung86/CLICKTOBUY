package Backend.BusinessLayer;

import Backend.DataLayer.IProductReponsitory;
import Backend.DataLayer.ProductReponsitoryImpl;
import Entity.Categories;
import Entity.Products;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ProductServicesimpl implements  IProductServices {
    public IProductReponsitory iProductReponsitory;
    public ProductServicesimpl() {
        iProductReponsitory = new ProductReponsitoryImpl();
    }
    @Override
    public ArrayList<Products> getAllListProduct(Map<Integer, Categories> categoriesMap ) {
        return iProductReponsitory.getAllListProduct(categoriesMap);
    }

    @Override
    public ArrayList<Products> getListProductSale(Map<Integer, Categories> categoriesMap) {
        return iProductReponsitory.getListProductSale(categoriesMap);
    }

    @Override
    public ArrayList<Products> getListProductType(int categoryIDType,Map<Integer, Categories> categoriesMap) {
        return iProductReponsitory.getListProductType(categoryIDType,categoriesMap);
    }


    @Override
    public ArrayList<Products> listProductSearchByName(String productName,Map<Integer, Categories> categoriesMap ) {
        return iProductReponsitory.listProductSearchByName(productName,categoriesMap);
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

    @Override
    public Map<Integer, Products> getProductsMap() {
        ICategoriesServices iCategoriesServices = new CategoriesServices();
        Map<Integer,Categories> mapCategories = iCategoriesServices.getMapCategories();
        return iProductReponsitory.getProductsMap(mapCategories);
    }

    @Override
    public List<Products> findProductByCategoryID(int categoryID) {
        return iProductReponsitory.findProductByCategoryID(categoryID);
    }
}
