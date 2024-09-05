package Services;

import Entity.Users;

import java.util.ArrayList;

public interface IUserServices {
    public ArrayList<Users> getAllUsers();
    public boolean insertUser(Users user);
    public boolean checkPhoneNumber(String phoneNumber);
    public Users getInfoFromPhoneNumber(String phoneNumber);
    public int getIdFromUserName(String userName);
}
