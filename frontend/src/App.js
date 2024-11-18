import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

function App() {
  const [userRole, setUserRole] = useState(null); // "owner" or "seller"

  const handleLogin = (role) => {
    setUserRole(role); // Set the role based on login
  };

  return (
    <div>
      <h1>E-commerce Admin Panel</h1>
      {userRole ? (
        <Dashboard userRole={userRole} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
