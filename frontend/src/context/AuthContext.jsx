import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = authAPI.isAuthenticated();
      setIsAuthenticated(isAuth);
      
      if (isAuth) {
        // On pourrait récupérer les infos user depuis le token JWT
        // Pour l'instant, on suppose juste qu'il est admin
        setUser({ role: 'ROLE_ADMIN' });
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await authAPI.login(username, password);
      
      setUser({ username, role: 'ROLE_ADMIN' });
      setIsAuthenticated(true);
      
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    authAPI.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const forgotPassword = async (username, garageCode) => {
    try {
      const response = await authAPI.forgotPassword(username, garageCode);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const resetPassword = async (username, garageCode, newPassword) => {
    try {
      const response = await authAPI.resetPassword(username, garageCode, newPassword);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    try {
      const response = await authAPI.changePassword(currentPassword, newPassword);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    forgotPassword,
    resetPassword,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider');
  }
  
  return context;
};

export default AuthContext;

