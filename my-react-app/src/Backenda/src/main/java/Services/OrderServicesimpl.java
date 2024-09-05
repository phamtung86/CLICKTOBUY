package Services;

import Reponsitory.IOrderReponsitory;
import Reponsitory.OrderReponsitoryimpl;
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
