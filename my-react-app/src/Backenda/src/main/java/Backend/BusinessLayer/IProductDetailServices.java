package Backend.BusinessLayer;

import Entity.ProductDetail;
import Entity.Products;

import java.util.ArrayList;
import java.util.Map;

public interface IProductDetailServices {
    public ArrayList<ProductDetail> getListAllProductDetail(Map<Integer,Products> mapProducts);
    public ProductDetail getProductDetailFromProductId(ArrayList<ProductDetail> listProductDetail,int id);
    public boolean insertProductDetail(ProductDetail productDetail, int productID);
}
