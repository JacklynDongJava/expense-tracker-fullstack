package com.example.expense_backend.service;

import com.example.expense_backend.dto.AuthResponse;
import com.example.expense_backend.dto.LoginRequest;
import com.example.expense_backend.dto.SignupRequest;
import com.example.expense_backend.entity.Organization;
import com.example.expense_backend.entity.User;
import com.example.expense_backend.enums.Role;
import com.example.expense_backend.repository.OrganizationRepository;
import com.example.expense_backend.repository.UserRepository;
import com.example.expense_backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final OrganizationRepository organizationRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthResponse signup(SignupRequest request) {
        Organization organization = organizationRepository.findByName(request.organizationName())
                .orElseGet(() -> {
                    Organization org = new Organization();
                    org.setName(request.organizationName());
                    return organizationRepository.save(org);
                });

        User user = new User();
        user.setOrganization(organization);
        user.setTenantId(organization.getId());
        user.setFullName(request.fullName());
        user.setEmail(request.email());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(request.role() == null ? Role.EMPLOYEE : request.role());

        if (request.managerId() != null) {
            User manager = userRepository.findByIdAndTenantId(request.managerId(), organization.getId())
                    .orElseThrow(() -> new RuntimeException("Manager not found"));
            user.setManager(manager);
        }

        User saved = userRepository.save(user);
        String token = jwtService.generateToken(saved);
        return new AuthResponse(token);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtService.generateToken(user);
        return new AuthResponse(token);
    }
}