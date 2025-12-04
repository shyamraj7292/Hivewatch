import React, { createContext, useContext, useState } from "react";

export type Role = "admin" | "analyst";

export interface User {
  id: string;
  email: string;
  role: Role;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

interface AuthContextValue {
  auth: AuthState;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({ user: null, token: null });

  const login = (token: string, user: User) => {
    setAuth({ token, user });
  };

  const logout = () => {
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}


