package Backend.DataLayer;

import Entity.Order;

public interface IOrderReponsitory {
    public boolean insertOrder(Order order, Integer userID, Integer voucherID);

}
