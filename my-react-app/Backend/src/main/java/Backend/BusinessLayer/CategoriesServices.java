package Backend.BusinessLayer;

import Entity.Categories;
import Backend.DataLayer.CategoriesReponsitoryimpl;
import Backend.DataLayer.ICategoriesReponsitory;

import java.util.ArrayList;
import java.util.Map;

public class CategoriesServices implements ICategoriesServices{
    public ICategoriesReponsitory iCategoriesReponsitory;
    public CategoriesServices() {
        iCategoriesReponsitory = new CategoriesReponsitoryimpl();
    }
    @Override
    public ArrayList<Categories> getListAllCategories() {
        return iCategoriesReponsitory.getListAllCategories();
    }

    @Override
    public Map<Integer, Categories> getMapCategories() {
        return iCategoriesReponsitory.getMapCategories();
    }
}
