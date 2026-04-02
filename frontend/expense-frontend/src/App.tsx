import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import EmployeePage from "./pages/EmployeePage";
import ManagerPage from "./pages/ManagerPage";
import AdminPage from "./pages/AdminPage";
import type { UserInfoResponse } from "./types";

function App() {
  const [token, setToken] = useState<string | null>(
      localStorage.getItem("token")
  );
  const [user, setUser] = useState<UserInfoResponse | null>(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  function handleLoginSuccess(newToken: string, newUser: UserInfoResponse) {
    setToken(newToken);
    setUser(newUser);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }

  if (!token || !user) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  if (user.role === "EMPLOYEE") {
    return <EmployeePage token={token} onLogout={handleLogout} />;
  }

  if (user.role === "MANAGER") {
    return <ManagerPage token={token} onLogout={handleLogout} />;
  }

  return <AdminPage onLogout={handleLogout} />;
}

export default App;