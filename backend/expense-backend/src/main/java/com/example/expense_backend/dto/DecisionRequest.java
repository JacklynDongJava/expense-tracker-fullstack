package com.example.expense_backend.dto;

import jakarta.validation.constraints.NotBlank;

public record DecisionRequest(
        @NotBlank String comment
) {
}