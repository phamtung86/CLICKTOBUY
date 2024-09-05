package Services;

import Entity.Categories;
import Reponsitory.CategoriesReponsitoryimpl;
import Reponsitory.ICategoriesReponsitory;

import java.util.ArrayList;

public class CategoriesServices implements ICategoriesServices{
    public ICategoriesReponsitory iCategoriesReponsitory;
    public CategoriesServices() {
        iCategoriesReponsitory = new CategoriesReponsitoryimpl();
    }
    @Override
    public ArrayList<Categories> getListAllCategories() {
        return iCategoriesReponsitory.getListAllCategories();
    }
}
