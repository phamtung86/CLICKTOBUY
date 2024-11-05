package Backend.BusinessLayer;

import Backend.DataLayer.IImportInventoryReponsitory;
import Entity.ImportInventoty;
import Entity.Products;

import java.util.List;
import java.util.Map;

public interface IImportInventoryServices {
    public boolean createImportInventory(ImportInventoty importInventoty);
    public List<ImportInventoty> getImportInventories(String type);
}
