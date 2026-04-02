export type Role = "EMPLOYEE" | "MANAGER" | "ADMIN";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

export interface UserInfoResponse {
    userId: number;
    tenantId: number;
    email: string;
    role: Role;
}

export interface CreateExpenseRequest {
    amount: number;
    category: string;
    notes: string;
}

export interface ExpenseResponse {
    id: number;
    amount: number;
    category: string;
    notes: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    decisionComment?: string | null;
    decidedAt?: string | null;
    createdAt: string;
}

export interface DecisionRequest {
    comment: string;
}