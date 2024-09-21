package Services;

import Entity.ProductDetail;
import Entity.Products;

import java.util.ArrayList;

public interface IProductDetailServices {
    public ArrayList<ProductDetail> getListAllProductDetail(ArrayList<Products> listProducts);
    public ProductDetail getProductDetailFromProductId(ArrayList<ProductDetail> listProductDetail,int id);
    public boolean insertProductDetail(ProductDetail productDetail, int productID);
}
