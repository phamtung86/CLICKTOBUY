package Services;

import Entity.Users;
import Reponsitory.AuthReponsitoryimpl;
import Reponsitory.IAuthReponsitory;

import java.util.ArrayList;

public class AuthServicesimpl implements IAuthServices {
    private IAuthReponsitory iAuthReponsitory;
    public AuthServicesimpl() {
        iAuthReponsitory = new AuthReponsitoryimpl();
    }
    @Override
    public String authAccount(String userName, String passWord, ArrayList<Users> listDataUser) {
        return iAuthReponsitory.authAccount(userName, passWord, listDataUser);
    }
}
