package Backend.DataLayer;

import Entity.OrderDetail;
import Entity.Products;

import java.util.ArrayList;
import java.util.Map;

public interface IOrderDetailReponsitory {
    public boolean insertOrderDetail(double price, int quantity, int productID, int orderID);

    public ArrayList<OrderDetail> getTopSellingProducts(String type);

    public int getTotalSelled(String type);
}
