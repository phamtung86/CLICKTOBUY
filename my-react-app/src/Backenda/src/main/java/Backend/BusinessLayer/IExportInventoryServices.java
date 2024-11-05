package Backend.BusinessLayer;

import Entity.ExportInventory;
import Entity.Order;
import Entity.Products;
import Entity.Users;

import java.util.List;
import java.util.Map;

public interface IExportInventoryServices {
    public boolean insertExportInventory(double price,String note,int idUserCreate, int idUserOrder,int idProduct, int idOrder);
    public List<ExportInventory> getExportInventories(String type);
}
