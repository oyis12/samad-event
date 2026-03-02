import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const BASE_URL = "https://igalawikiserver.onrender.com/api";

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");
    const savedUser = sessionStorage.getItem("user");

    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(JSON.parse(savedUser));

    setLoading(false);
  }, []);

  const login = ({ token, user }) => {
    setToken(token);
    setUser(user);

    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);

    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  };

  return (
    <AppContext.Provider
      value={{
        BASE_URL,
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook to use the context
export const useApp = () => useContext(AppContext);