package Backend.PresentationLayer;

import Entity.ProductDetail;
import Entity.Products;
import Backend.BusinessLayer.IProductDetailServices;
import Backend.BusinessLayer.ProductDetailServicesimpl;

import java.util.ArrayList;

public class ProductDetailController {
    public IProductDetailServices iProductDetailServices;
    public ProductDetailController() {
        iProductDetailServices = new ProductDetailServicesimpl();
    }
    public ArrayList<ProductDetail> getListAllProductDetail(ArrayList<Products> listProducts){
            return iProductDetailServices.getListAllProductDetail(listProducts);
    }
    public ProductDetail getProductDetailFromProductId(ArrayList<ProductDetail> listProductDetail,int id){
        return iProductDetailServices.getProductDetailFromProductId(listProductDetail,id);
    }
    public boolean insertProductDetail(ProductDetail productDetail, int productID){
        return iProductDetailServices.insertProductDetail(productDetail,productID);
    }
}
