import { useEffect, useState } from "react";
import { approveExpense, getPendingExpenses, rejectExpense } from "../api";
import type { ExpenseResponse, UserInfoResponse } from "../types";
import UserInfoCard from "../components/UserInfoCard";

interface Props {
    token: string;
    user: UserInfoResponse;
    onLogout: () => void;
}

export default function ManagerPage({ token, user, onLogout }: Props) {
    const [expenses, setExpenses] = useState<ExpenseResponse[]>([]);
    const [commentMap, setCommentMap] = useState<Record<number, string>>({});
    const [error, setError] = useState("");

    async function loadPending() {
        try {
            const data = await getPendingExpenses(token);
            setExpenses(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load pending expenses");
        }
    }

    useEffect(() => {
        loadPending();
    }, []);

    async function handleApprove(id: number) {
        try {
            await approveExpense(token, id, {
                comment: commentMap[id] || "Approved",
            });
            await loadPending();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Approve failed");
        }
    }

    async function handleReject(id: number) {
        try {
            const comment = commentMap[id] || "";
            if (!comment.trim()) {
                setError("Reject requires a comment");
                return;
            }

            await rejectExpense(token, id, { comment });
            await loadPending();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Reject failed");
        }
    }

    return (
        <div style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Manager Dashboard</h2>
                <button onClick={onLogout}>Logout</button>
            </div>

            <UserInfoCard user={user} />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <h3>Pending Expenses</h3>
            <ul>
                {expenses.map((expense) => (
                    <li key={expense.id} style={{ marginBottom: 16 }}>
                        <div>
                            #{expense.id} - {expense.category} - ${expense.amount}
                        </div>
                        <div>Notes: {expense.notes}</div>

                        <input
                            placeholder="Comment"
                            value={commentMap[expense.id] || ""}
                            onChange={(e) =>
                                setCommentMap((prev) => ({
                                    ...prev,
                                    [expense.id]: e.target.value,
                                }))
                            }
                        />

                        <div style={{ marginTop: 8 }}>
                            <button onClick={() => handleApprove(expense.id)}>Approve</button>
                            <button onClick={() => handleReject(expense.id)} style={{ marginLeft: 8 }}>
                                Reject
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}