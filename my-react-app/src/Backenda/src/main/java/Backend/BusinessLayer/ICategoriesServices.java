package Backend.BusinessLayer;

import Entity.Categories;

import java.util.ArrayList;
import java.util.Map;

public interface ICategoriesServices {
    public ArrayList<Categories> getListAllCategories();
    public Map<Integer, Categories> getMapCategories();
}
