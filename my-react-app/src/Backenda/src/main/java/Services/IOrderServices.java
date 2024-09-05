package Services;

import Entity.Order;

public interface IOrderServices {
    public boolean insertOrder(Order order, Integer userID, Integer voucherID);
}
