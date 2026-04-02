package com.example.expense_backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DecisionRequest {
    @NotBlank
    private String comment;
}