import type {
    AuthResponse,
    CreateExpenseRequest,
    DecisionRequest,
    ExpenseResponse,
    LoginRequest,
    UserInfoResponse,
} from "./types";

const BASE_URL = "http://localhost:8080";

function getAuthHeaders(token: string) {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Request failed: ${response.status}`);
    }
    return response.json();
}

export async function login(data: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    return handleResponse<AuthResponse>(response);
}

export async function getMeDetails(token: string): Promise<UserInfoResponse> {
    const response = await fetch(`${BASE_URL}/api/me/details`, {
        headers: getAuthHeaders(token),
    });

    return handleResponse<UserInfoResponse>(response);
}

export async function createExpense(
    token: string,
    data: CreateExpenseRequest
): Promise<ExpenseResponse> {
    const response = await fetch(`${BASE_URL}/api/expenses`, {
        method: "POST",
        headers: getAuthHeaders(token),
        body: JSON.stringify(data),
    });

    return handleResponse<ExpenseResponse>(response);
}

export async function getMyExpenses(token: string): Promise<ExpenseResponse[]> {
    const response = await fetch(`${BASE_URL}/api/expenses/me`, {
        headers: getAuthHeaders(token),
    });

    return handleResponse<ExpenseResponse[]>(response);
}

export async function getPendingExpenses(
    token: string
): Promise<ExpenseResponse[]> {
    const response = await fetch(`${BASE_URL}/api/manager/expenses/pending`, {
        headers: getAuthHeaders(token),
    });

    return handleResponse<ExpenseResponse[]>(response);
}

export async function approveExpense(
    token: string,
    expenseId: number,
    data: DecisionRequest
): Promise<ExpenseResponse> {
    const response = await fetch(
        `${BASE_URL}/api/manager/expenses/${expenseId}/approve`,
        {
            method: "POST",
            headers: getAuthHeaders(token),
            body: JSON.stringify(data),
        }
    );

    return handleResponse<ExpenseResponse>(response);
}

export async function rejectExpense(
    token: string,
    expenseId: number,
    data: DecisionRequest
): Promise<ExpenseResponse> {
    const response = await fetch(
        `${BASE_URL}/api/manager/expenses/${expenseId}/reject`,
        {
            method: "POST",
            headers: getAuthHeaders(token),
            body: JSON.stringify(data),
        }
    );

    return handleResponse<ExpenseResponse>(response);
}