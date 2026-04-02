# Multi-Tenant Expense Tracker

## 🎯 Overview

This project is a full-stack expense management system where:

* Employees submit expenses
* Managers approve or reject them
* Data is isolated at the organization (tenant) level

The goal of this project is to demonstrate:

* Multi-tenancy design
* Authentication and authorization
* Role-based workflows
* End-to-end full-stack implementation

---

## ⏱️ Scope & Design Approach

Given the time constraints of this assignment, I focused on building:

* A clean and functional end-to-end system
* Core features including authentication, multi-tenancy, and approval workflows
* A simple but extensible architecture

The system is intentionally designed to be **easy to understand and extend**, rather than overly complex.

---

## 🏗️ Architecture

### Frontend

* React + TypeScript
* Communicates with backend via REST APIs

### Backend

* Java + Spring Boot
* Spring Security (JWT-based authentication)
* JPA / Hibernate

### Database

* Relational database (H2 for demo)
* Shared schema with `tenant_id` column

---

## 🔐 Authentication & Authorization

* JWT-based authentication (stateless)
* Token is returned on login and sent with every request
* Role-Based Access Control (RBAC):

| Role     | Permissions                    |
| -------- | ------------------------------ |
| EMPLOYEE | Submit & view own expenses     |
| MANAGER  | Approve / reject team expenses |
| ADMIN    | Organization-level access      |

---

## 🧠 Multi-Tenancy Design

* Shared database with `tenant_id` on all tenant-scoped tables
* Tenant is derived from the authenticated user (JWT)
* Enforced at:

  * Security layer
  * Service layer
  * Repository queries

👉 Ensures **strict data isolation between organizations**

---

## 🔄 Expense Workflow

### State Machine

```
PENDING → APPROVED
        → REJECTED
```

* Employees submit expenses
* Managers approve or reject
* Rejection requires a comment
* Decision is final (no state reversal)

---

## 💻 Demo Flow

1. Register a manager under an organization
2. Login → receive JWT token
3. Register an employee (linked to manager)
4. Employee submits an expense
5. Manager reviews and approves/rejects
6. Employee sees final status and comments

---

## 🚀 Possible Improvements

Based on the current implementation, the system can be extended in several ways:

### Multi-Tenancy

* Move to schema-per-tenant or database-per-tenant for stronger isolation

### Authentication

* Add refresh token rotation for better security

### File Handling

* Support receipt uploads using S3 + pre-signed URLs

### Rate Limiting

* Implement per-tenant rate limiting using Redis

### Workflow Enhancements

* Handle manager reassignment and reassign pending approvals

### Observability

* Add audit logs for approvals and system actions

---

## 📌 Summary

This project demonstrates:

* Full-stack development
* Secure multi-tenant architecture
* JWT-based authentication
* Role-based approval workflows

The system is intentionally simple, but designed in a way that can evolve into a production-ready solution.

---

## 🎥 Demo Video

(Add your screen recording link here)
