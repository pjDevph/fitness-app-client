// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser, getUserDetails } from '../services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const login = useCallback(async (credentials) => {
    try {
      const response = await loginUser(credentials);
      localStorage.setItem('token', response.access);
      setToken(response.access);
      const userData = await getUserDetails();
      setUser(userData.user);
      navigate('/workouts');
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  }, [navigate]);

  const register = async (userData) => {
    try {
      await registerUser(userData);
      navigate('/login');
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    const validateToken = async () => {
      try {
        if (token) {
          const userData = await getUserDetails();
          setUser(userData.user);
        }
      } catch (error) {
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [token, logout]);

  const value = {
    user,
    token,
    isLoading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};