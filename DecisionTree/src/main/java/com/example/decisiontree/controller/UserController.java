package com.example.decisiontree.controller;

import com.example.decisiontree.model.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class UserController {

    @GetMapping("/user/new")
    public String showCreateForm(Model model) {
        model.addAttribute("user", new User());
        return "create-user";
    }

    @PostMapping("/user/new")
    public String createUser(@ModelAttribute User user) {
        // 사용자 정보를 저장하는 로직
        return "redirect:/user/" + user.getName();
    }

    @GetMapping("/index")
    public String getIndex() {
        return "index";
    }

}