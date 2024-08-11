package controller;

import Services.Usersservice;
import modal.Users;

import java.util.ArrayList;

public class UsersController {
    private final Usersservice usersservice;

    public UsersController(Usersservice usersservice) {
        this.usersservice = usersservice;
    }

    public ArrayList<Users> getAllUsers() {
        return usersservice.getAllUsers();
    }

    public void addUser(Users user) {
        usersservice.insertUser(user);
    }

    public Users getInfoFromPhoneNumber(String phoneNumber) {
        return usersservice.getInfoFromPhoneNumber(phoneNumber);
    }

}
