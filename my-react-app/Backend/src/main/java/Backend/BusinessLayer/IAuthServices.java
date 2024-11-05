package Backend.BusinessLayer;

import Entity.Users;

import java.util.ArrayList;

public interface IAuthServices {
    public String authAccount (String userName, String passWord, ArrayList<Users> listDataUser);
}
