# Multi-Tenant Expense Tracker

A full-stack expense management system where employees submit expenses and managers approve or reject them, with strict organization-level data isolation.

---

## 🚀 Tech Stack

### Backend
- Java 17
- Spring Boot
- Spring Security (JWT)
- JPA / Hibernate
- H2 (for demo)

### Frontend
- React
- TypeScript
- Vite

---

## ✨ Features

### Authentication & Authorization
- JWT-based authentication
- Stateless backend (no sessions)
- Role-based access control (RBAC)
  - EMPLOYEE
  - MANAGER
  - ADMIN

### Multi-Tenancy
- Shared database with `tenant_id`
- All queries are scoped by tenant
- Prevents cross-tenant data access

### Expense Workflow
- Employees can:
  - Submit expenses
  - View their own expenses
- Managers can:
  - View pending expenses from their team
  - Approve / Reject with comments
- Admins can:
  - (placeholder for analytics)

### Approval System
- State machine:
  - PENDING → APPROVED / REJECTED
- Reject requires comment
- Audit fields:
  - decisionComment
  - decidedAt

### Frontend
- Login / Signup
- Role-based page routing
- Employee dashboard
- Manager approval dashboard
- Error handling (user-friendly messages)

---

## 🧠 Design Decisions

### Multi-Tenancy Strategy
I used a **shared database with a `tenant_id` column**.

**Pros:**
- Simple implementation
- Cost-effective
- Easy to scale for this exercise

**Cons:**
- Requires strict filtering in every query

**Mitigation:**
- Tenant is extracted from JWT
- Applied at service layer
- Enforced in all repository queries

---

### Authentication (JWT)

- Access token returned after login/signup
- Stored in localStorage (for demo simplicity)
- Sent via `Authorization: Bearer <token>`

---

### RBAC

Implemented using Spring Security:

- `/api/admin/**` → ADMIN
- `/api/manager/**` → MANAGER
- `/api/expenses/**` → authenticated users

