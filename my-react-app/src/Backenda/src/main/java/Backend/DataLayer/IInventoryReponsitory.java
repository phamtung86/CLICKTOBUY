package Backend.DataLayer;

import Entity.Inventory;
import Entity.Products;

import java.util.List;
import java.util.Map;

public interface IInventoryReponsitory {
    public List<Inventory> getAllInventorys(Map<Integer, Products> mapProducts);
    public boolean updateQuantityAfterImport(int quantity, int productId);
    public List<Inventory> getInventoriresPreOutOfStock(Map<Integer, Products> mapProducts);
    public boolean createInventory(int productId);
    public Inventory findInventoryByProductId(int productId,Map<Integer, Products> mapProducts);

}
