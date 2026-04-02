package com.example.expense_backend.dto;

import com.example.expense_backend.enums.ExpenseStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ExpenseResponse(
        Long id,
        BigDecimal amount,
        String category,
        String notes,
        ExpenseStatus status,
        String decisionComment,
        LocalDateTime decidedAt,
        LocalDateTime createdAt
) {
}