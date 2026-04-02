import type { UserInfoResponse } from "../types";

interface Props {
    user: UserInfoResponse;
}

export default function UserInfoCard({ user }: Props) {
    return (
        <div
            style={{
                border: "1px solid #ddd",
                padding: 12,
                marginBottom: 20,
                borderRadius: 8,
                background: "#f8f8f8",
            }}
        >
            <h3 style={{ marginTop: 0 }}>My Info</h3>
            <div><strong>User ID:</strong> {user.userId}</div>
            <div><strong>Tenant ID:</strong> {user.tenantId}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Role:</strong> {user.role}</div>
        </div>
    );
}