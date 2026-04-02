package com.example.expense_backend.repository;

import com.example.expense_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByIdAndTenantId(Long id, Long tenantId);

    List<User> findByManagerIdAndTenantId(Long managerId, Long tenantId);
}