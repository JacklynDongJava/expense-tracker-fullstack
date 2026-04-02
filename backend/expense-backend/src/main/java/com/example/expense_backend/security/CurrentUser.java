package com.example.expense_backend.security;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CurrentUser {
    private Long userId;
    private Long tenantId;
    private String email;
    private String role;
}