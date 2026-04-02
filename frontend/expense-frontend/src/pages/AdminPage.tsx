interface Props {
    onLogout: () => void;
}

export default function AdminPage({ onLogout }: Props) {
    return (
        <div style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Admin Dashboard</h2>
                <button onClick={onLogout}>Logout</button>
            </div>

            <p>Admin analytics page coming next.</p>
        </div>
    );
}