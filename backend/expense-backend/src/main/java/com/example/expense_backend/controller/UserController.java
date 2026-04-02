package com.example.expense_backend.controller;

import com.example.expense_backend.dto.UserInfoResponse;
import com.example.expense_backend.security.CurrentUser;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/api/me/details")
    public UserInfoResponse getCurrentUser(Authentication authentication) {
        CurrentUser user = (CurrentUser) authentication.getPrincipal();

        return new UserInfoResponse(
                user.getUserId(),
                user.getTenantId(),
                user.getEmail(),
                user.getRole()
        );
    }
}