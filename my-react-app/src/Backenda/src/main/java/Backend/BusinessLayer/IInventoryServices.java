package Backend.BusinessLayer;

import Entity.Inventory;
import Entity.Products;

import java.util.List;
import java.util.Map;

public interface IInventoryServices {
    public List<Inventory> getAllInventorys(Map<Integer, Products> mapProducts);
    public boolean updateQuantityAfterImport(int quantity, int productId);
    public List<Inventory> getInventoriresPreOutOfStock(Map<Integer, Products> mapProducts);
    public boolean createInventory(int productId);
    public Inventory findInventoryByProductId(int productId);
}
