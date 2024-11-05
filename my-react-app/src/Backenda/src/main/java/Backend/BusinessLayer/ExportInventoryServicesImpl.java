package Backend.BusinessLayer;

import Backend.DataLayer.ExportInventoryReponsitoryimpl;
import Backend.DataLayer.IExportInventoryReponsiroty;
import Entity.*;

import java.util.List;
import java.util.Map;

public class ExportInventoryServicesImpl implements IExportInventoryServices {
    private IExportInventoryReponsiroty iExportInventoryReponsiroty;

    public ExportInventoryServicesImpl() {
        iExportInventoryReponsiroty = new ExportInventoryReponsitoryimpl();
    }

    @Override
    public boolean insertExportInventory(double price, String note, int idUserCreate, int idUserOrder, int idProduct, int idOrder) {
        IUserServices iUserServices = new UserServicesimpl();
        IProductServices iProductServices = new ProductServicesimpl();
        IOrderServices iOrderServices = new OrderServicesimpl();
        Users userCreate = iUserServices.getMapUsers().get(idUserCreate);
        Users userOrder = iUserServices.getMapUsers().get(idUserOrder);
        Products product = iProductServices.getProductsMap().get(idProduct);
        Order order = iOrderServices.getMapOrders().get(idOrder);
        ExportInventory exportInventory = new ExportInventory(price, note, userCreate, product, userOrder, order);
        return iExportInventoryReponsiroty.insertExportInventory(exportInventory);
    }

    @Override
    public List<ExportInventory> getExportInventories(String type) {
        String SELECT_EXPORT_INVENTORY_TYPE = "";
        switch (type) {
            case "ALL":
                SELECT_EXPORT_INVENTORY_TYPE = "SELECT * FROM export_inventory ORDER BY date DESC";
                break;
            case "DAY":
                SELECT_EXPORT_INVENTORY_TYPE = "SELECT * FROM export_inventory WHERE DAY(date) = DAY(CURRENT_DATE) ORDER BY date DESC";
                break;
            case "MONTH":
                SELECT_EXPORT_INVENTORY_TYPE = "SELECT * FROM export_inventory WHERE MONTH(date) = MONTH(CURRENT_DATE) ORDER BY date DESC";
                break;
            case "YEAR":
                SELECT_EXPORT_INVENTORY_TYPE = "SELECT * FROM export_inventory WHERE YEAR(date) = YEAR(CURRENT_DATE) ORDER BY date DESC";
                break;
            default:
                SELECT_EXPORT_INVENTORY_TYPE = "SELECT * FROM export_inventory ORDER BY date DESC";
                break;
        }
        IUserServices iUserServices = new UserServicesimpl();
        IProductServices iProductServices = new ProductServicesimpl();
        IOrderDetailServices iOrderDetailServices = new OrderDetailServicesimpl();
        Map<Integer, Users> mapUsers = iUserServices.getMapUsers();
        Map<Integer, Products> mapProducts = iProductServices.getProductsMap();
        Map<Integer, OrderDetail> mapOrdersDetail = iOrderDetailServices.mapOrderDetailByOrderID();
        return iExportInventoryReponsiroty.getExportInventories(SELECT_EXPORT_INVENTORY_TYPE, mapUsers, mapProducts, mapOrdersDetail);
    }
}
