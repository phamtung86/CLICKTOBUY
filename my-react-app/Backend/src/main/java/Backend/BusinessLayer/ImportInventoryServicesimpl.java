package Backend.BusinessLayer;

import Backend.DataLayer.IImportInventoryReponsitory;
import Backend.DataLayer.ImportInventoryReponsitoryimpl;
import Entity.ImportInventoty;
import Entity.Products;

import java.util.List;
import java.util.Map;

public class ImportInventoryServicesimpl implements IImportInventoryServices {
    private IImportInventoryReponsitory iImportInventoryReponsitory;

    public ImportInventoryServicesimpl() {
        iImportInventoryReponsitory = new ImportInventoryReponsitoryimpl();
    }

    @Override
    public boolean createImportInventory(ImportInventoty importInventoty) {
        return iImportInventoryReponsitory.createImportInventory(importInventoty);
    }

    @Override
    public List<ImportInventoty> getImportInventories(String type) {
        IProductServices iProductServices = new ProductServicesimpl();
        Map<Integer, Products> mapProducts = iProductServices.getProductsMap();
        String GET_ALL_INVENTORIES = "";
        switch (type) {
            case "ALL":
                GET_ALL_INVENTORIES = "SELECT * FROM import_inventory ORDER BY date DESC";
                break;
            case "DAY":
                GET_ALL_INVENTORIES = "SELECT * FROM import_inventory WHERE DAY(date) = DAY(CURRENT_DATE) ORDER BY date DESC";
                break;
            case "MONTH":
                GET_ALL_INVENTORIES = "SELECT * FROM import_inventory WHERE MONTH(date) = MONTH(CURRENT_DATE) ORDER BY date DESC";
                break;
            case "YEAR":
                GET_ALL_INVENTORIES = "SELECT * FROM import_inventory WHERE YEAR(date) = YEAR(CURRENT_DATE) ORDER BY date DESC";
                break;
            default:
                GET_ALL_INVENTORIES = "SELECT * FROM import_inventory ORDER BY date DESC";
                break;
        }
        return iImportInventoryReponsitory.getImportInventories(GET_ALL_INVENTORIES,mapProducts);
    }
}
