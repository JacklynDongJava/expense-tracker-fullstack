import { useEffect, useState } from "react";
import { createExpense, getMyExpenses } from "../api";
import type { ExpenseResponse } from "../types";

interface Props {
    token: string;
    onLogout: () => void;
}

export default function EmployeePage({ token, onLogout }: Props) {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [notes, setNotes] = useState("");
    const [expenses, setExpenses] = useState<ExpenseResponse[]>([]);
    const [error, setError] = useState("");

    async function loadExpenses() {
        try {
            const data = await getMyExpenses(token);
            setExpenses(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load expenses");
        }
    }

    useEffect(() => {
        loadExpenses();
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        try {
            await createExpense(token, {
                amount: Number(amount),
                category,
                notes,
            });

            setAmount("");
            setCategory("");
            setNotes("");
            await loadExpenses();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to create expense");
        }
    }

    return (
        <div style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Employee Dashboard</h2>
                <button onClick={onLogout}>Logout</button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, maxWidth: 400 }}>
                <input
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <input
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <textarea
                    placeholder="Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
                <button type="submit">Submit Expense</button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <h3 style={{ marginTop: 24 }}>My Expenses</h3>
            <ul>
                {expenses.map((expense) => (
                    <li key={expense.id} style={{ marginBottom: 12 }}>
                        <div>
                            #{expense.id} - {expense.category} - ${expense.amount} - {expense.status}
                        </div>
                        <div>Notes: {expense.notes}</div>
                        {expense.decisionComment && (
                            <div>Manager Comment: {expense.decisionComment}</div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}