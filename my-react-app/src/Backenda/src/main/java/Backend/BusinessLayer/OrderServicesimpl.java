package Backend.BusinessLayer;

import Backend.DataLayer.IOrderReponsitory;
import Backend.DataLayer.OrderReponsitoryimpl;
import Entity.Order;

public class OrderServicesimpl implements IOrderServices {
    public IOrderReponsitory iOrderReponsitory;
    public OrderServicesimpl() {
        iOrderReponsitory = new OrderReponsitoryimpl();
    }
    @Override
    public boolean insertOrder(Order order, Integer userID, Integer voucherID) {
        return iOrderReponsitory.insertOrder(order, userID, voucherID);
    }
}
