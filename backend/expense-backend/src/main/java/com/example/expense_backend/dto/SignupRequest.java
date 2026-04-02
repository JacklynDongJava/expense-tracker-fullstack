package com.example.expense_backend.dto;

import com.example.expense_backend.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record SignupRequest(
        @NotBlank String organizationName,
        @NotBlank String fullName,
        @Email @NotBlank String email,
        @NotBlank String password,
        Role role,
        Long managerId
) {
}