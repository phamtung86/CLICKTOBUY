package Backend.BusinessLayer;

import Entity.ProductDetail;
import Entity.Products;
import Backend.DataLayer.IProductDetailReponsitory;
import Backend.DataLayer.ProductDetailReponsitoryimpl;


import java.util.ArrayList;
import java.util.Map;

public class ProductDetailServicesimpl implements  IProductDetailServices {
    public IProductDetailReponsitory iProductDetailReponsitory;
    public ProductDetailServicesimpl() {
        iProductDetailReponsitory = new ProductDetailReponsitoryimpl();
    }
    @Override
    public ArrayList<ProductDetail> getListAllProductDetail( Map<Integer,Products> mapProducts) {
        return iProductDetailReponsitory.getListAllProductDetail(mapProducts);
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
