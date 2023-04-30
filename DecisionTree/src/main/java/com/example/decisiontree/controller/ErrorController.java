package com.example.decisiontree.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ErrorController implements org.springframework.boot.web.servlet.error.ErrorController {

    @RequestMapping("/error")
    public String handleError() {
        // 에러 페이지 뷰 이름 반환
        return "error";
    }

    public String getErrorPath() {
        return "/error";
    }
}
