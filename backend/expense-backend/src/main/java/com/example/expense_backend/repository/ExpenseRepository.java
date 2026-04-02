package com.example.expense_backend.repository;

import com.example.expense_backend.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByEmployeeIdAndTenantId(Long employeeId, Long tenantId);

    Optional<Expense> findByIdAndTenantId(Long id, Long tenantId);

    List<Expense> findByApproverIdAndTenantIdAndStatus(Long approverId, Long tenantId, com.example.expense_backend.enums.ExpenseStatus status);
}
