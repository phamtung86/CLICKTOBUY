package Backend.PresentationLayer;

import Entity.Users;
import Backend.BusinessLayer.AuthServicesimpl;
import Backend.BusinessLayer.IAuthServices;

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
