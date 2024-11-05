package Backend.BusinessLayer;

import Backend.DataLayer.IOrderDetailReponsitory;
import Backend.DataLayer.OrderDetailReponsitoryimpl;
import Entity.OrderDetail;
import Entity.Products;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class OrderDetailServicesimpl implements IOrderDetailServices {
    public IOrderDetailReponsitory iOrderDetailReponsitory;

    public OrderDetailServicesimpl() {
        iOrderDetailReponsitory = new OrderDetailReponsitoryimpl();
    }

    @Override
    public boolean insertOrderDetail(double price, int quantity, int productID, int orderID) {
        return iOrderDetailReponsitory.insertOrderDetail(price, quantity, productID, orderID);
    }

    @Override
    public ArrayList<OrderDetail> getTopSellingProducts(String type) {
        return iOrderDetailReponsitory.getTopSellingProducts(type);
    }

    @Override
    public int getTotalSelled(String type) {
        return iOrderDetailReponsitory.getTotalSelled(type);
    }

    @Override
    public List<OrderDetail> listOderDetailsById(int id, Map<Integer, Products> mapProducts) {
        return iOrderDetailReponsitory.listOderDetailsById(id,mapProducts);
    }

    @Override
    public Map<Integer, OrderDetail> mapOrderDetailByOrderID() {
        IProductServices iProductServices = new ProductServicesimpl();
        Map<Integer,Products> mapProducts = iProductServices.getProductsMap();
        return iOrderDetailReponsitory.mapOrderDetailByOrderID(mapProducts);
    }

}
