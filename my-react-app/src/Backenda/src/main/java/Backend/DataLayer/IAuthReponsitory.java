package Backend.DataLayer;

import Entity.Users;

import java.util.ArrayList;

public interface IAuthReponsitory {
    public String authAccount (String userName, String passWord, ArrayList<Users> listDataUser);
}
