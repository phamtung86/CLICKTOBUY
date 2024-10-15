package Backend.BusinessLayer;

import Backend.DataLayer.IOrderDetailReponsitory;
import Backend.DataLayer.OrderDetailReponsitoryimpl;
import Entity.OrderDetail;

import java.util.ArrayList;

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

}
