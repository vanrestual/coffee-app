import { createContext, ReactNode, useContext, useState } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import { AuthAPI } from "./api";

export interface AuthContextType {
  credentials: any;
  signin: (user: { username: string; password: string }, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function useAuth() {
  return useContext(AuthContext);
}

export function RequireAuth() {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.credentials) return <Navigate to="/login" state={{ from: location }} replace />;
  return <Outlet />;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [credentials, setCredentials] = useState<any>(null);
  const [cookies, setCookie, removeCookie] = useCookies(['access_token', 'refresh_token', 'token_type']);
  const location = useLocation();

  const signin = (newUser: { username: string; password: string }, callback: VoidFunction) => {
    return AuthAPI.signin(async () => {
      const data = Object.assign(newUser, {
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        grant_type: process.env.REACT_APP_GRANT_TYPE,
      });
      try {
        const request = await fetch(`${process.env.REACT_APP_API_ENDPOINT}oauth/token`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json"
          }
        });
        const response = await request.json();

        if(!request.ok) return <Navigate to="/login" state={{ from: location }} replace />;

        setCookie('access_token', response.access_token, { path: '/',  expires: response.expires})
        setCookie('refresh_token', response.refresh_token, {path: '/', expires: response.expires})
        setCookie('token_type', response.token_type, { path: '/',  expires: response.expires})

        setCredentials(cookies);
        callback();
      } catch (error) {
        console.log(error);
      }
    });
  };

  const signout = (callback: VoidFunction) => {
    return AuthAPI.signout(() => {
      removeCookie('access_token', { path: '/' })
      removeCookie('refresh_token', {path: '/' })
      removeCookie('token_type', {path: '/' })
      setCredentials(null);
      callback();
    });
  };

  const value = { credentials, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}