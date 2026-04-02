package com.example.expense_backend.controller;

import com.example.expense_backend.dto.CreateExpenseRequest;
import com.example.expense_backend.dto.ExpenseResponse;
import com.example.expense_backend.security.CurrentUser;
import com.example.expense_backend.service.ExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping
    public ExpenseResponse createExpense(@Valid @RequestBody CreateExpenseRequest request,
                                         Authentication authentication) {
        CurrentUser currentUser = (CurrentUser) authentication.getPrincipal();
        return expenseService.createExpense(request, currentUser);
    }

    @GetMapping("/me")
    public List<ExpenseResponse> getMyExpenses(Authentication authentication) {
        CurrentUser currentUser = (CurrentUser) authentication.getPrincipal();
        return expenseService.getMyExpenses(currentUser);
    }
}