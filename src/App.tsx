import { Routes, Route } from "react-router-dom";
import AuthProvider, { RequireAuth } from "./authentication/Context";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Menu, { Header } from "./pages/Menu";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<Layout header={<Header />} />}>
            <Route path="/menu" element={<Menu />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}
