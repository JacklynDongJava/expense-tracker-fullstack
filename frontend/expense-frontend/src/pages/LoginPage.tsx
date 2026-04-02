import { useState } from "react";
import { login, getMeDetails } from "../api";
import type { UserInfoResponse } from "../types";

interface Props {
    onLoginSuccess: (token: string, user: UserInfoResponse) => void;
}

export default function LoginPage({ onLoginSuccess }: Props) {
    const [email, setEmail] = useState("manager@example.com");
    const [password, setPassword] = useState("123456");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const auth = await login({ email, password });
            const user = await getMeDetails(auth.token);

            localStorage.setItem("token", auth.token);
            localStorage.setItem("user", JSON.stringify(user));

            onLoginSuccess(auth.token, user);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ padding: 24 }}>
            <h2>Expense Tracker Login</h2>
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12, maxWidth: 320 }}>
                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}