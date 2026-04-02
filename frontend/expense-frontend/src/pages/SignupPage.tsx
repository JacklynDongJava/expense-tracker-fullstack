import { useState } from "react";
import { getMeDetails, signup } from "../api";
import type { Role, UserInfoResponse } from "../types";

interface Props {
    onSignupSuccess: (token: string, user: UserInfoResponse) => void;
    onGoToLogin: () => void;
}

export default function SignupPage({
                                       onSignupSuccess,
                                       onGoToLogin,
                                   }: Props) {
    const [organizationName, setOrganizationName] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<Role | "">("");
    const [managerId, setManagerId] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (!organizationName || !fullName || !email || !password) {
            setError("All required fields must be filled");
            return;
        }

        if (!role) {
            setError("Please select a role");
            return;
        }

        setLoading(true);

        try {
            const auth = await signup({
                organizationName,
                fullName,
                email,
                password,
                role,
                managerId:
                    role === "EMPLOYEE" && managerId ? Number(managerId) : undefined,
            });

            const user = await getMeDetails(auth.token);

            localStorage.setItem("token", auth.token);
            localStorage.setItem("user", JSON.stringify(user));

            onSignupSuccess(auth.token, user);
        } catch (err) {
            console.error("Signup error:", err);
            setError(err instanceof Error ? err.message : "Signup failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ padding: 24 }}>
            <h2>Expense Tracker Signup</h2>

            <form
                onSubmit={handleSubmit}
                style={{ display: "grid", gap: 12, maxWidth: 360 }}
            >
                <input
                    placeholder="Organization Name"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                    required
                />

                <input
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />

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

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as Role)}
                    required
                >
                    <option value="">Select Role</option>
                    <option value="EMPLOYEE">Employee</option>
                    <option value="MANAGER">Manager</option>
                    <option value="ADMIN">Admin</option>
                </select>

                {role === "EMPLOYEE" && (
                    <input
                        placeholder="Manager ID"
                        value={managerId}
                        onChange={(e) => setManagerId(e.target.value)}
                    />
                )}

                <button type="submit" disabled={loading}>
                    {loading ? "Signing up..." : "Sign Up"}
                </button>
            </form>

            <button onClick={onGoToLogin} style={{ marginTop: 16 }}>
                Go to Login
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}