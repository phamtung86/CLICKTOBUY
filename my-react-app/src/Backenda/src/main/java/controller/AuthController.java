package controller;

import Entity.Users;
import Services.AuthServicesimpl;
import Services.IAuthServices;

import java.util.ArrayList;

public class AuthController {
    private IAuthServices iAuthServices;
    public AuthController() {
        iAuthServices = new AuthServicesimpl();
    }
    public String authAccount (String userName, String passWord, ArrayList<Users> listDataUser){
        return iAuthServices.authAccount(userName,passWord,listDataUser);
    }
}
