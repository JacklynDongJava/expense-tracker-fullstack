package com.example.expense_backend.dto;

public record UserInfoResponse(
        Long userId,
        Long tenantId,
        String email,
        String role
) {
}