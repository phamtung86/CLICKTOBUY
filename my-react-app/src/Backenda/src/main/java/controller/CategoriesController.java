package controller;

import Entity.Categories;
import Services.CategoriesServices;
import Services.ICategoriesServices;

import java.util.ArrayList;
import java.util.Map;

public class CategoriesController {
    public ICategoriesServices iCategoriesServices;
    public CategoriesController() {
        iCategoriesServices = new CategoriesServices();
    }
    public ArrayList<Categories> getListAllCategories(){
        return iCategoriesServices.getListAllCategories();
    }
    public Map<Integer, Categories> getMapCategories(){
        return iCategoriesServices.getMapCategories();
    }
}
