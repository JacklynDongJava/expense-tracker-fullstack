import { useState } from "react";
import { getMeDetails, login } from "../api";
import type { UserInfoResponse } from "../types";

interface Props {
    onLoginSuccess: (token: string, user: UserInfoResponse) => void;
    onGoToSignup: () => void;
}

export default function LoginPage({ onLoginSuccess, onGoToSignup }: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Email and password are required");
            return;
        }

        setLoading(true);

        try {
            const auth = await login({ email, password });
            const user = await getMeDetails(auth.token);

            localStorage.setItem("token", auth.token);
            localStorage.setItem("user", JSON.stringify(user));

            onLoginSuccess(auth.token, user);
        } catch (err) {
            console.error("Login error:", err);
            setError(err instanceof Error ? err.message : "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ padding: 24 }}>
            <h2>Expense Tracker Login</h2>

            <form
                onSubmit={handleSubmit}
                style={{ display: "grid", gap: 12, maxWidth: 320 }}
            >
                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            <button onClick={onGoToSignup} style={{ marginTop: 16 }}>
                Go to Signup
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}