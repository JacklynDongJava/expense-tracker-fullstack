import type { UserInfoResponse } from "../types";
import UserInfoCard from "../components/UserInfoCard";

interface Props {
    user: UserInfoResponse;
    onLogout: () => void;
}

export default function AdminPage({ user, onLogout }: Props) {
    return (
        <div style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Admin Dashboard</h2>
                <button onClick={onLogout}>Logout</button>
            </div>

            <UserInfoCard user={user} />

            <p>Admin analytics page coming next.</p>
        </div>
    );
}