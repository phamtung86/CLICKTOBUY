package controller;

import Services.IOrderServices;
import Services.OrderServicesimpl;
import Entity.Order;

import java.sql.SQLException;

public class OrderController {

    private IOrderServices iOrderServices;

    public OrderController() {
        iOrderServices = new OrderServicesimpl();
    }

    public void insertOrder(Order order, Integer userID, Integer voucherID) throws SQLException {
        iOrderServices.insertOrder(order, userID, voucherID);
    }
}
