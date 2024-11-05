package Backend.BusinessLayer;

import Backend.DataLayer.IInventoryReponsitory;
import Backend.DataLayer.InventoryReponsitoryipml;
import Entity.Inventory;
import Entity.Products;

import java.util.List;
import java.util.Map;

public class InventoryServicesimpl implements IInventoryServices{
    private IInventoryReponsitory iInventoryReponsitory;

    public InventoryServicesimpl() {
        iInventoryReponsitory = new InventoryReponsitoryipml();
    }
    @Override
    public List<Inventory> getAllInventorys(Map <Integer, Products > mapProducts) {
        return iInventoryReponsitory.getAllInventorys(mapProducts);
    }
    public boolean updateQuantityAfterImport(int quantity, int productId){
        return iInventoryReponsitory.updateQuantityAfterImport(quantity,productId);
    }

    @Override
    public List<Inventory> getInventoriresPreOutOfStock(Map<Integer, Products> mapProducts) {
        return iInventoryReponsitory.getInventoriresPreOutOfStock(mapProducts);
    }

    @Override
    public boolean createInventory(int productId) {
        return iInventoryReponsitory.createInventory(productId);
    }

    @Override
    public Inventory findInventoryByProductId(int productId) {
        IProductServices iProductServices = new ProductServicesimpl();
        Map<Integer, Products> mapProducts = iProductServices.getProductsMap();
        return iInventoryReponsitory.findInventoryByProductId(productId, mapProducts);
    }
}
