package Backend.BusinessLayer;

import Entity.OrderDetail;

import java.util.ArrayList;

public interface IOrderDetailServices {
    public boolean insertOrderDetail(double price, int quantity, int productID, int orderID);

    public ArrayList<OrderDetail> getTopSellingProducts(String type);

    public int getTotalSelled(String type);
}
