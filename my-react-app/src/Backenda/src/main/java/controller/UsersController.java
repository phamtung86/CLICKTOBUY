package controller;

import Services.IUserServices;
import Services.UserServicesimpl;
import Entity.Users;

import java.util.ArrayList;

public class UsersController {
    private IUserServices iUserServices;

    public UsersController() {
        iUserServices = new UserServicesimpl();
    }

    public ArrayList<Users> getAllUsers() {
        return iUserServices.getAllUsers();
    }

    public void addUser(Users user) {
        iUserServices.insertUser(user);
    }

    public Users getInfoFromPhoneNumber(String phoneNumber) {
        return iUserServices.getInfoFromPhoneNumber(phoneNumber);
    }

    public int getIDFromUsername(String username) {
        return iUserServices.getIdFromUserName(username);
    }


}
