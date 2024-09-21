package Backend.BusinessLayer;

import Entity.ProductDetail;
import Entity.Products;
import Backend.DataLayer.IProductDetailReponsitory;
import Backend.DataLayer.ProductDetailReponsitoryimpl;


import java.util.ArrayList;

public class ProductDetailServicesimpl implements  IProductDetailServices {
    public IProductDetailReponsitory iProductDetailReponsitory;
    public ProductDetailServicesimpl() {
        iProductDetailReponsitory = new ProductDetailReponsitoryimpl();
    }
    @Override
    public ArrayList<ProductDetail> getListAllProductDetail(ArrayList<Products> listProducts) {
        return iProductDetailReponsitory.getListAllProductDetail(listProducts);
    }

    @Override
    public ProductDetail getProductDetailFromProductId(ArrayList<ProductDetail> listProductDetail, int id) {
        return iProductDetailReponsitory.getProductDetailFromProductId(listProductDetail, id);
    }

    @Override
    public boolean insertProductDetail(ProductDetail productDetail , int productID) {
        return iProductDetailReponsitory.insertProductDetail(productDetail,productID);
    }
}
