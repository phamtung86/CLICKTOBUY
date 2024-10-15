package Backend.BusinessLayer;

import Entity.Users;

import java.util.ArrayList;
import java.util.Map;

public interface IUserServices {
    public ArrayList<Users> getAllUsers();
    public boolean insertUser(Users user);
    public boolean checkPhoneNumber(String phoneNumber);
    public Users getInfoFromPhoneNumber(String phoneNumber);
    public int getIdFromUserName(String userName);
    public int getQuantityUser();
    public Map<Integer,Users> getMapUsers();
    public boolean updateStatusUser(int id, int status);
}
