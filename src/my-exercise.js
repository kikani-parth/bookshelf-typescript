import React from "react";
import { createRoot } from "react-dom/client";
import { Logo } from "components/logo";

function App() {
  const handleLoginClick = () => alert("Login button clicked");
  const handleRegisterClick = () => alert("Register button clicked");

  return (
    <div>
      <Logo width="80" height="80" />
      <h1>Bookshelf</h1>
      <div>
        <button onClick={handleLoginClick}>Login</button>
      </div>
      <div>
        <button onClick={handleRegisterClick}>Register</button>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error("Failed to find the root element");
}
