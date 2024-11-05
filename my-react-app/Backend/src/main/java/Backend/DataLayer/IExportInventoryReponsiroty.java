package Backend.DataLayer;

import Entity.*;

import java.util.List;
import java.util.Map;

public interface IExportInventoryReponsiroty {
    public boolean insertExportInventory(ExportInventory exportInventory);
    public List<ExportInventory> getExportInventories(String sql,Map<Integer, Users> mapUsers, Map<Integer, Products> mapProducts,Map<Integer,OrderDetail> mapOrderDetails);
}
