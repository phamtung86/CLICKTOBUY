package Backend.BusinessLayer;

import Entity.Order;

public interface IOrderServices {
    public boolean insertOrder(Order order, Integer userID, Integer voucherID);
}
