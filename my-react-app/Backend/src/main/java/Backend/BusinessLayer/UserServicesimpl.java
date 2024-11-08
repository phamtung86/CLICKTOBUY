package Backend.BusinessLayer;

import Backend.DataLayer.IUserReponsitory;
import Backend.DataLayer.UserReponsitoryimpl;
import Entity.Users;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class UserServicesimpl implements IUserServices {
    public IUserReponsitory iUserReponsitory;
    public UserServicesimpl() {
        iUserReponsitory = new UserReponsitoryimpl();
    }
    @Override
    public ArrayList<Users> getAllUsers() {
        return iUserReponsitory.getAllUsers();
    }

    @Override
    public boolean insertUser(Users user) {
        return iUserReponsitory.insertUser(user);
    }

    @Override
    public boolean checkPhoneNumber(String phoneNumber) {
        return iUserReponsitory.checkPhoneNumber(phoneNumber);
    }

    @Override
    public Users getInfoFromPhoneNumber(String phoneNumber) {
        return iUserReponsitory.getInfoFromPhoneNumber(phoneNumber);
    }

    @Override
    public int getIdFromUserName(String userName) {
        return iUserReponsitory.getIdFromUserName(userName);
    }

    @Override
    public int getQuantityUser() {
        return iUserReponsitory.getQuantityUser();
    }

    @Override
    public Map<Integer, Users> getMapUsers() {
        return iUserReponsitory.getMapUsers();
    }

    @Override
    public boolean updateStatusUser(int id, int status) {
        return iUserReponsitory.updateStatusUser(id, status);
    }

    @Override
    public List<Users> getListUsersWithPaging(int page, int size) {
        return iUserReponsitory.getListUsersWithPaging(page, size);
    }

    @Override
    public boolean updateForgotPassword(String newPassword, String username) {
        return iUserReponsitory.updateForgotPassword(newPassword, username);
    }
}
