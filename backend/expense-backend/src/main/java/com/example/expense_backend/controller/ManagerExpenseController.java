package com.example.expense_backend.controller;

import com.example.expense_backend.dto.DecisionRequest;
import com.example.expense_backend.dto.ExpenseResponse;
import com.example.expense_backend.security.CurrentUser;
import com.example.expense_backend.service.ExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/manager/expenses")
@RequiredArgsConstructor
public class ManagerExpenseController {

    private final ExpenseService expenseService;

    @GetMapping("/pending")
    public List<ExpenseResponse> getPendingExpenses(Authentication authentication) {
        CurrentUser currentUser = (CurrentUser) authentication.getPrincipal();
        return expenseService.getPendingExpensesForManager(currentUser);
    }

    @PostMapping("/{id}/approve")
    public ExpenseResponse approveExpense(@PathVariable Long id,
                                          @Valid @RequestBody DecisionRequest request,
                                          Authentication authentication) {
        CurrentUser currentUser = (CurrentUser) authentication.getPrincipal();
        return expenseService.approveExpense(id, request, currentUser);
    }

    @PostMapping("/{id}/reject")
    public ExpenseResponse rejectExpense(@PathVariable Long id,
                                         @Valid @RequestBody DecisionRequest request,
                                         Authentication authentication) {
        CurrentUser currentUser = (CurrentUser) authentication.getPrincipal();
        return expenseService.rejectExpense(id, request, currentUser);
    }
}