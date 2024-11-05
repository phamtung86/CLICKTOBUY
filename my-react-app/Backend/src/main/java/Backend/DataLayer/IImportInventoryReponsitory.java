package Backend.DataLayer;

import Entity.ImportInventoty;
import Entity.Products;

import java.util.List;
import java.util.Map;

public interface IImportInventoryReponsitory {
    public boolean createImportInventory(ImportInventoty importInventoty);
    public List<ImportInventoty> getImportInventories(String sql,Map<Integer, Products> mapPorducts);
}
