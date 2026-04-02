import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
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
  const [mode, setMode] = useState<"login" | "signup">("login");

  function handleAuthSuccess(newToken: string, newUser: UserInfoResponse) {
    setToken(newToken);
    setUser(newUser);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setMode("login");
  }

  if (!token || !user) {
    if (mode === "signup") {
      return (
          <SignupPage
              onSignupSuccess={handleAuthSuccess}
              onGoToLogin={() => setMode("login")}
          />
      );
    }

    return (
        <LoginPage
            onLoginSuccess={handleAuthSuccess}
            onGoToSignup={() => setMode("signup")}
        />
    );
  }

  if (user.role === "EMPLOYEE") {
    return <EmployeePage token={token} user={user} onLogout={handleLogout} />;
  }

  if (user.role === "MANAGER") {
    return <ManagerPage token={token} user={user} onLogout={handleLogout} />;
  }

  return <AdminPage user={user} onLogout={handleLogout} />;
}

export default App;