package Backend.DataLayer;


import Entity.Categories;

import java.util.ArrayList;
import java.util.Map;

public interface ICategoriesReponsitory {
    public ArrayList<Categories> getListAllCategories();
    public Map<Integer, Categories> getMapCategories();
}
