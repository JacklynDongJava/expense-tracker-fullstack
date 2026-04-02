package com.example.expense_backend.service;

import com.example.expense_backend.dto.CreateExpenseRequest;
import com.example.expense_backend.dto.ExpenseResponse;
import com.example.expense_backend.entity.Expense;
import com.example.expense_backend.entity.User;
import com.example.expense_backend.enums.ExpenseStatus;
import com.example.expense_backend.repository.ExpenseRepository;
import com.example.expense_backend.repository.UserRepository;
import com.example.expense_backend.security.CurrentUser;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final UserRepository userRepository;

    public ExpenseResponse createExpense(CreateExpenseRequest request, CurrentUser currentUser) {
        User employee = userRepository.findByIdAndTenantId(currentUser.getUserId(), currentUser.getTenantId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Expense expense = new Expense();
        expense.setTenantId(currentUser.getTenantId());
        expense.setEmployee(employee);
        expense.setApprover(employee.getManager());
        expense.setAmount(request.getAmount());
        expense.setCategory(request.getCategory());
        expense.setNotes(request.getNotes());
        expense.setStatus(ExpenseStatus.PENDING);
        expense.setCreatedAt(LocalDateTime.now());

        Expense saved = expenseRepository.save(expense);
        return toResponse(saved);
    }

    public List<ExpenseResponse> getMyExpenses(CurrentUser currentUser) {
        return expenseRepository.findByEmployeeIdAndTenantId(currentUser.getUserId(), currentUser.getTenantId())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private ExpenseResponse toResponse(Expense expense) {
        return new ExpenseResponse(
                expense.getId(),
                expense.getAmount(),
                expense.getCategory(),
                expense.getNotes(),
                expense.getStatus(),
                expense.getCreatedAt()
        );
    }
}