import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ChatPage from './pages/chatpage';
import AdminPage from './pages/adminpage';
import LoginPage from './pages/loginpage';
import { authApi } from './api/authApi';
import './style.css';

// Lab 2 - Main Application Component
// main entry point for React SPA using React Router
function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const userData = await authApi.getCurrentUser();
        setUser(userData);
      } catch (error) {
        // User not authenticated
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return <div className="loading">加载中...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={user ? <Navigate to="/" /> : <LoginPage onLogin={handleLogin} />} 
        />
        <Route 
          path="/" 
          element={user ? <ChatPage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/admin" 
          element={
            user ? (
              user.role === 'admin' ? 
                <AdminPage user={user} onLogout={handleLogout} /> : 
                <Navigate to="/" />
            ) : <Navigate to="/login" />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
