// LoginPage.js
import React from 'react';

const LoginPage = () => {
  const handleLogin = () => {
    // Redirect to your backend route to initiate the OAuth process
    window.location.href = process.env.REACT_APP_API_GOOGLE_AUTH_URL;
  };

  return (
    <div className="login-container">
      <h1 className="text-2xl font-bold">Welcome to Expense Tracker</h1>
      <button onClick={handleLogin} className="login-button">
        Login with Google
      </button>
    </div>
  );
};

export default LoginPage;
