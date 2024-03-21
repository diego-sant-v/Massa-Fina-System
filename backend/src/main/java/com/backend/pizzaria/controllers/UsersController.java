package com.backend.pizzaria.controllers;

import com.backend.pizzaria.models.UsersModel;
import com.backend.pizzaria.repository.UsersRepository;
import com.backend.pizzaria.util.SecurityConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/users")
public class UsersController {
    @Autowired
    private UsersRepository usersRepository;

    @GetMapping("/all")
    public List<UsersModel> getAllUsers(){
        return usersRepository.findAll();
    }


    @PostMapping("")
    public UsersModel createUser(@RequestBody UsersModel usersModel) {
        usersModel.setActive(true);
        usersModel.setConfirmedUser(false);
        SecurityConfig securityConfig = new SecurityConfig();
        usersModel.setPassword(securityConfig.encryptData(usersModel.getPassword()));
        sendEmailtoConfirmUser();
        return usersRepository.save(usersModel);
    }

    public void sendEmailtoConfirmUser(){

    }

    @GetMapping("/login")
    public UsersModel loginUsers(@RequestParam("email") String email, @RequestParam("password") String password) {
        SecurityConfig securityConfig = new SecurityConfig();
        return usersRepository.userLogin(email, securityConfig.encryptData(password));
    }
}
