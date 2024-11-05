package Backend.DataLayer;

import Entity.OrderDetail;
import Entity.Products;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public interface IOrderDetailReponsitory {
    public boolean insertOrderDetail(double price, int quantity, int productID, int orderID);

    public ArrayList<OrderDetail> getTopSellingProducts(String type);

    public int getTotalSelled(String type);

    public List<OrderDetail> listOderDetailsById(int id,Map<Integer,Products> mapProducts);

    public Map<Integer,OrderDetail> mapOrderDetailByOrderID(Map<Integer,Products> mapProducts);
}
