package controller;

import Entity.Categories;
import Services.CategoriesServices;
import Services.ICategoriesServices;

import java.util.ArrayList;

public class CategoriesController {
    public ICategoriesServices iCategoriesServices;
    public CategoriesController() {
        iCategoriesServices = new CategoriesServices();
    }
    public ArrayList<Categories> getListAllCategories(){
        return iCategoriesServices.getListAllCategories();
    }
}
